import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ToDo } from "src/entity/table/todo.entity";
import { ToDoDetail } from "src/entity/table/todoDetail.entity";
import { DataSource, QueryRunner, Repository } from "typeorm";

@Injectable()
export class TodoDao {
  constructor(
    @InjectRepository(ToDo)
    private todoRepository: Repository<ToDo>,

    @InjectRepository(ToDoDetail)
    private todoDetailRepository: Repository<ToDoDetail>,

    private readonly dataSource: DataSource,
  ) {}

  async getTodoList(item: { id: number }): Promise<ToDo[]> {
    console.log(item.id);
    const datas = await this.todoRepository
      .createQueryBuilder("todo")
      .innerJoinAndSelect("todo.user", "user")
      .select([
        "todo.todoNum",
        "todo.todoTitle",
        "todo.todoDate",
        "todo.todoChk",
        "todo.todoType",
      ])
      .where("user.user_num = :userNum", { userNum: item.id })
      .orderBy("todo.todo_date", "DESC")
      .getMany();
    return datas;
  }

  async addTodoList(item: {
    id: number;
    title: string;
    type: string;
    contents: string[];
  }) {
    console.log("TodoDao:", item);
    console.log("TodoDao Title:", item.title);
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1번작업시작
      // insert결과물 저장
      const insertResult = await queryRunner.manager.insert("todo", {
        todoTitle: item.title,
        todoType: item.type,
        userUserNum: item.id,
      });

      // 결과물에 todo_num받아오기
      const generatedTodoNum = insertResult.identifiers[0].todoNum;

      console.log("creat todoNum:", generatedTodoNum);

      // 2번 작업시작
      await queryRunner.manager.insert("todo_detail", {
        todoTodoNum: generatedTodoNum, // 생성된 toDoNum을 보냄
      });

      item.contents.forEach(async (content) => {
        await queryRunner.manager.insert("detail_job_list", {
          jobTitle: content,
          todoDetailTodoTodoNum: generatedTodoNum,
        });
      });

      //작업이 잘 되면 commit
      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteTodoList(item: { userNum: number; todoNum: number }) {
    const deleteSatus = await this.todoRepository.delete({
      todoNum: item.todoNum,
      userUserNum: item.userNum,
    });

    if (deleteSatus) {
      return true;
    } else {
      return false;
    }
  }
}

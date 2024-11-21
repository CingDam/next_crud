import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ToDo } from "src/entity/table/board.entity";
import { DataSource, QueryRunner, Repository } from "typeorm";

@Injectable()
export class TodoDao {
  constructor(
    @InjectRepository(ToDo)
    private todoRepository: Repository<ToDo>,
    private readonly dataSource: DataSource,
  ) {}
  async addTodoList(item: {
    id: number;
    title: string;
    type: string;
    content: string;
  }) {
    console.log(item);
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1번작업시작
      // insert결과물 저장
      const insertResult = await queryRunner.manager.insert("todo", {
        todo_title: item.title,
        todo_type: item.type,
        user_user_num: item.id,
      });

      // 결과물에 todo_num받아오기
      const generatedTodoNum = insertResult.identifiers[0].todo_num;

      // 2번 작업시작
      await queryRunner.manager.insert("todo_detail", {
        todo_todo_num: generatedTodoNum, // 생성된 toDoNum을 보냄
        content: item.content,
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
}

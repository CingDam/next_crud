import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TodoDetailJob } from "src/entity/table/job.entity";
import { Repository } from "typeorm";

@Injectable()
export class JobDao {
  constructor(
    @InjectRepository(TodoDetailJob)
    private jobRepository: Repository<TodoDetailJob>,
  ) {}

  async getJobs(item: { todoNum: number }): Promise<TodoDetailJob[]> {
    console.log(item.todoNum);
    const jobs = await this.jobRepository
      .createQueryBuilder("job") // 조회할 테이블 별칭 설정
      .innerJoinAndSelect("job.todoDetail", "todoDetail")
      // 엔터티에서 ManyToOne 의 별칭.변수명, 별칭
      // 별칭.변수명으로 할 경우 자동적으로 엔터티에서 연결한 엔터티끼리 불러옴
      .select()
      .where("todoDetail.todo_todo_num = :todoNum", { todoNum: item.todoNum })
      .getMany();

    return jobs;
  }

  async delJob(item: { jobNum: number; todoNum: number }) {
    const jobChk = await this.jobRepository.delete({
      todoDetailTodoTodoNum: item.todoNum,
      jobNum: item.jobNum,
    });

    console.log(jobChk);

    if (jobChk.affected !== 0) {
      return true;
    } else {
      return false;
    }
  }
}

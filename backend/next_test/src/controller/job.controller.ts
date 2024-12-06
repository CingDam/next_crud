import { Body, Controller, Delete, Post, Put } from "@nestjs/common";
import { JobService } from "src/service/job.service";
import { TodoService } from "src/service/todo.service";

@Controller("/jobs")
export class JobController {
  constructor(
    private readonly jobService: JobService,
    private readonly todoService: TodoService,
  ) {}

  @Post("get-job")
  async getJobs(@Body() item: { userNum: number; todoNum: number }) {
    const jobs = await this.jobService.getJobs(item);
    console.log("할 일 길이:", jobs);

    if (jobs.data.length === 0) {
      this.todoService.deleteTodoList(item);
    } else {
      if (jobs) {
        return {
          message: "할 일 목록 받아오기 성공!",
          item: jobs.data,
          total: jobs.total,
        };
      } else {
        return { message: "받아오기 실패!" };
      }
    }
  }

  @Post("add-job")
  async AddJobs(@Body() item: { id: number; contents: string[] }) {
    const addChk = await this.jobService.addJobs(item);
    if (addChk) {
      return { chk: true };
    } else {
      return { chk: false };
    }
  }

  @Post("dummy")
  async dummy(@Body() item: { id: number }) {
    const dummyChk = this.jobService.dummy(item);
    if (dummyChk) {
      return true;
    } else {
      return false;
    }
  }

  @Put("update-job")
  async UpdateJob(
    @Body() item: { todoNum: number; jobNum: number; title: string },
  ) {
    const updateChk = await this.jobService.updateJob(item);

    if (updateChk) {
      return { chk: true };
    } else {
      return { chk: false };
    }
  }

  @Delete("del-job")
  async delJob(@Body() item: { jobNum: number; todoNum: number }) {
    console.log("삭제 값:", item);
    const delChk = await this.jobService.delJob(item);

    if (delChk) {
      return { message: "삭제 성공!" };
    } else {
      return { message: "삭제 실패!" };
    }
  }

  @Delete("del-jobs")
  async delJobs(@Body() item: { todoNum: number; jobNum: number[] }) {
    console.log(item);
    const multidelChk = await this.jobService.delJobs(item);

    if (multidelChk) {
      return { chk: true };
    } else {
      return { chk: false };
    }
  }
}

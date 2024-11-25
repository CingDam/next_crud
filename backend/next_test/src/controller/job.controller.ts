import { Body, Controller, Delete, Post } from "@nestjs/common";
import { JobService } from "src/service/job.service";

@Controller("/jobs")
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post("get-job")
  async getJobs(@Body() item: { todoNum: number }) {
    const jobs = await this.jobService.getJobs(item);

    if (jobs) {
      return { message: "할 일 목록 받아오기 성공!", item: jobs };
    } else {
      return { message: "받아오기 실패!" };
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
}

import { Injectable } from "@nestjs/common";
import { JobDao } from "src/dao/job.dao";

@Injectable()
export class JobService {
  constructor(private readonly jobDao: JobDao) {}

  async getJobs(item: { todoNum: number }) {
    return await this.jobDao.getJobs(item);
  }

  async delJob(item: { jobNum: number; todoNum: number }){
    const jobChk = await this.jobDao.delJob(item);

    if (jobChk) {
      return true;
    } else {
      return false;
    }
  }
}

import { Injectable } from "@nestjs/common";
import { JobDao } from "src/dao/job.dao";

@Injectable()
export class JobService {
  constructor(private readonly jobDao: JobDao) {}

  async getJobs(item: { todoNum: number }) {
    return await this.jobDao.getJobs(item);
  }

  async updateJob(item: { todoNum: number; jobNum: number; title: string }) {
    const updateChk = await this.jobDao.updateJob(item);

    if (updateChk) {
      return true;
    } else {
      return false;
    }
  }

  async delJob(item: { jobNum: number; todoNum: number }) {
    const jobChk = await this.jobDao.delJob(item);

    if (jobChk) {
      return true;
    } else {
      return false;
    }
  }

  async delJobs(item: { todoNum: number; jobNum: number[] }) {
    const multiJobChk = await this.jobDao.delJobs(item);

    if (multiJobChk) {
      return true;
    } else {
      return false;
    }
  }
}

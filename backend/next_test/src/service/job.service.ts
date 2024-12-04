import { Injectable } from "@nestjs/common";
import { JobDao } from "src/dao/job.dao";
import { Pager } from "src/util/pager.util";

@Injectable()
export class JobService {
  constructor(
    private readonly jobDao: JobDao,
    private readonly pager: Pager,
  ) {}

  async getJobs(item: { todoNum: number; pager: Pager }) {
    const total = await this.jobDao.total(item);
    console.log("job pager:", total);
    this.pager.total = total;
    return await this.jobDao.getJobs(item);
  }

  async addJobs(item: { id: number; contents: string[] }) {
    const addChk = this.jobDao.addJobs(item);

    if (addChk) {
      return true;
    } else {
      return false;
    }
  }

  async dummy(item: { id: number }) {
    const dummyChk = this.jobDao.dummy(item);

    if (dummyChk) {
      return true;
    } else {
      return false;
    }
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

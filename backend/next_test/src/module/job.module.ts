import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobDao } from "src/dao/job.dao";
import { TodoDetailJob } from "src/entity/table/job.entity";
import { JobService } from "src/service/job.service";

@Module({
  imports: [TypeOrmModule.forFeature([TodoDetailJob])],
  providers: [JobService, JobDao],
  exports: [JobService],
})
export class JobModule {}

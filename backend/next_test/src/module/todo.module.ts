import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoDao } from "src/dao/todo.dao";
import { TodoDetailJob } from "src/entity/table/job.entity";
import { ToDo } from "src/entity/table/todo.entity";
import { ToDoDetail } from "src/entity/table/todoDetail.entity";
import { TodoService } from "src/service/todo.service";
import { Pager } from "src/util/pager.util";

@Module({
  imports: [TypeOrmModule.forFeature([ToDo, ToDoDetail, TodoDetailJob])],
  providers: [TodoService, TodoDao, Pager],
  exports: [TodoService],
})
export class TodoModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoDao } from "src/dao/todo.dao";
import { ToDo } from "src/entity/table/board.entity";
import { TodoService } from "src/service/todo.service";

@Module({
  imports: [TypeOrmModule.forFeature([ToDo])],
  providers: [TodoService, TodoDao],
  exports: [TodoService],
})
export class TodoModule {}

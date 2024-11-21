import { Body, Controller, Post } from "@nestjs/common";
import { TodoService } from "src/service/todo.service";

@Controller("/todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post("/get-todo")
  async getTodoList(@Body() item: { id: number }) {
    console.log(item);
    const todoList = await this.todoService.getTodoList(item);
    if (todoList) {
      return { message: "조회성공", item: todoList };
    } else {
      return { message: "조회 실패" };
    }
  }

  @Post("/add-todo")
  async addTodoList(
    @Body() item: { id: number; title: string; type: string; content: string },
  ) {
    const addData = this.todoService.addTodoList(item);
    if (addData) {
      return { messasge: "추가 성공" };
    } else {
      return { message: "추가 실패!" };
    }
  }
}

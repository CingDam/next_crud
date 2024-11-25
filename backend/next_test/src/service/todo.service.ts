import { Injectable } from "@nestjs/common";
import { TodoDao } from "src/dao/todo.dao";

@Injectable()
export class TodoService {
  constructor(private readonly todoDao: TodoDao) {}

  async getTodoList(item: { id: number }) {
    const datas = await this.todoDao.getTodoList(item);
    console.log(datas);
    return datas;
  }

  async addTodoList(item: {
    id: number;
    title: string;
    type: string;
    contents: string[];
  }) {
    console.log("todoService:", item);
    const addData = await this.todoDao.addTodoList(item);
    if (addData) {
      return true;
    } else {
      return false;
    }
  }

  async deleteTodoList(item: { userNum: number; todoNum: number }) {
    const deleteData = await this.todoDao.deleteTodoList(item);
    if (deleteData) {
      return true;
    } else {
      return false;
    }
  }
}

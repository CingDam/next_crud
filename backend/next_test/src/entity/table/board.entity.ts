import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("todo")
export class toDo {
  @PrimaryGeneratedColumn({ name: "todo_num" })
  todoNum: number;
}

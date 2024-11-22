import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ToDo } from "./todo.entity";
import { TodoDetailJob } from "./job.enetity";

@Entity("todo_detail")
export class ToDoDetail {
  @PrimaryGeneratedColumn({ name: "todo_todo_num" })
  todoTodoNum: number;

  @Column({ name: "content" })
  content: string;

  @Column({ name: "progress" })
  progress: number;

  @OneToOne(() => ToDo)
  // referencedColumnName은 Entity 변수랑 같게
  @JoinColumn({ name: "todo_todo_num", referencedColumnName: "todoNum" })
  todo: ToDo;

  @OneToMany(() => TodoDetailJob, (job) => job.todoDetailTodoTodoNum, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "todo_detail_todo_todo_num" })
  job: TodoDetailJob;
}

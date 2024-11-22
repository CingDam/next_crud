import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ToDoDetail } from "./todoDetail.entity";

@Entity("todo_detail_job")
export class TodoDetailJob {
  @PrimaryGeneratedColumn({ name: "job_num" })
  jobNum: number;

  @Column({ name: "job_title" })
  jobTile: string;

  @Column({ name: "job_chk" })
  jobChk: string;

  @Column({ name: "todo_detail_todo_todo_num" })
  todoDetailTodoTodoNum: number;

  @ManyToOne(() => ToDoDetail, (todoDetail) => todoDetail.todoTodoNum)
  todoDetail: ToDoDetail;
}

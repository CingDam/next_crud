import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ToDoDetail } from "./todoDetail.entity";

@Entity("detail_job_list")
export class TodoDetailJob {
  @PrimaryGeneratedColumn({ name: "job_num" })
  jobNum: number;

  @Column({ name: "job_title" })
  jobTitle: string;

  @Column({ name: "job_chk" })
  jobChk: string;

  @Column({ name: "todo_detail_todo_todo_num" })
  todoDetailTodoTodoNum: number;

  @ManyToOne(() => ToDoDetail, (todoDetail) => todoDetail.jobs, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "todo_detail_todo_todo_num" })
  todoDetail: ToDoDetail;
}

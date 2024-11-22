import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { ToDoDetail } from "./todoDetail.entity";

@Entity("todo")
export class ToDo {
  @PrimaryGeneratedColumn({ name: "todo_num" })
  todoNum: number;

  @Column({ name: "todo_title" })
  todoTitle: string;

  @Column({ name: "todo_chk" })
  todoChk: string;

  @Column({ name: "todo_type" })
  todoType: string;

  @Column({ name: "todo_date" })
  todoDate: Date;

  @Column({ name: "user_user_num" })
  userUserNum: number;

  @ManyToOne(() => User, (user) => user.todos, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_user_num" })
  user: User;

  @OneToOne(() => ToDoDetail, (detail) => detail.todo)
  detail: ToDoDetail;
}

import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ToDo } from "./todo.entity";
import { TodoDetailJob } from "./job.entity";

@Entity("todo_detail")
export class ToDoDetail {
  @PrimaryGeneratedColumn({ name: "todo_todo_num" })
  todoTodoNum: number;

  @Column({ type: "simple-array", name: "content" })
  content: string[];

  @Column({ name: "progress" })
  progress: number;

  // OneToOne 식별관계 자식 테이블
  // 자식의 경우 JoinColumn사용하기
  @OneToOne(() => ToDo)
  // 식별 관계 혹은 트랜잭션 테이블은 referencedColumnName 필요
  // referencedColumnName은 Entity 변수랑 같게
  @JoinColumn({ name: "todo_todo_num", referencedColumnName: "todoNum" })
  todo: ToDo;

  @OneToMany(() => TodoDetailJob, (job) => job.todoDetail)
  jobs: TodoDetailJob[];
}

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
  // ManyToOne => 1:N관계의 자식 테이블
  // (first val, sencond val, object)
  /*
    first val => 부모테이블
    second val(map함수) => 아래 엔터티를 불러온 변수명 / 
                          그 엔터티에서 OneToMany의 변수명

    object -> 삭제 참조나 삽입참조 등 참조관련 된 내용
  */

  // JoinColumn({name: "val"})
  // 자식 테이블 연결관계에서 필요 자식테이블의 외래키를 적어주면 됨
  @ManyToOne(() => User, (user) => user.todos, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_user_num" })
  user: User;

  // OneToOne 부모 테이블
  // (()=> entity 클래스명, (item명(주로 자식엔터티 변수명)) => 자식entity변수명.부모변수명)
  // OneToMany와 다르게 배열을 안쓰는 이유 => 1:1관계는 무조건 하나의 관계이기 때문
  @OneToOne(() => ToDoDetail, (detail) => detail.todo)
  detail: ToDoDetail;
}

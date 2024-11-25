import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ToDo } from "./todo.entity";

// @Entity('value') => value는 테이블 or 뷰이름
// value가 빈 값일 경우 typeorm이 자동생성
@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  user_num: number;

  @Column() // name 옵션을 사용해 스네이크 케이스로 지정
  user_id: string;

  @Column()
  user_pwd: string;

  @Column()
  user_name: string;

  @Column()
  user_email_id: string;

  @Column()
  user_email_address: string;

  @Column()
  signup_date: Date;

  // OneToMany =>1:N관계의 부모테이블
  // (first val, sencond val)
  /*
    first val = () => 참조 테이블
    sencond val(맵 함수) = (table) => table.참조테이블 변수명  
  */
  // 변수의 모델타입은 [](Array 타입) 다수 데이터이므로 배열로 설정할 것
  @OneToMany(() => ToDo, (todo) => todo.user)
  todos: ToDo[];
}

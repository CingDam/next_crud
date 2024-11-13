import { Column, ViewEntity } from "typeorm";

@ViewEntity("user_info")
export class UserInfo {
  @Column()
  userNum: number;

  @Column()
  userId: string;

  @Column()
  userPwd: string;

  @Column()
  userEmail: string;

  @Column()
  signupDate: Date;
}

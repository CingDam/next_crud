import { Column, ViewEntity } from "typeorm";

@ViewEntity("user_info")
export class UserInfo {
  @Column({ name: "user_num" })
  userNum: number;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "user_pwd" })
  userPwd: string;

  @Column({ name: "user_email" })
  userEmail: string;

  @Column({ name: "signup_date" })
  signupDate: Date;
}

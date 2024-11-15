import { Injectable } from "@nestjs/common";
import { UserDao } from "src/dao/user.dao";

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async login(item: { user_id: string; user_pwd: string }) {
    return this.userDao.login(item);
  }
}

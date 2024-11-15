import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/table/user.entity";
import { UserInfo } from "src/entity/view/userInfo.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserDao {
  constructor(
    //Repository 주입
    //@InjectRepositroy(value) => entity.ts값 넣기
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
  ) {}

  async login(item: { user_id: string; user_pwd: string }): Promise<UserInfo> {
    const userData = this.userInfoRepository.findOne({
      where: { userId: item.user_id, userPwd: item.user_pwd },
    });

    return userData;
  }
}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserDao } from "src/dao/user.dao";
import { User } from "src/entity/table/user.entity";
import { UserInfo } from "src/entity/view/userInfo.entity";
import { UserService } from "src/service/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, UserInfo])],
  providers: [UserService, UserDao],
  exports: [UserService],
})
export class UserModule {}

import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "next_db",
  password: "12345",
  database: "next_todo",
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  synchronize: false, // 배포 및 뷰 사용할 때는 false
  connectorPackage: "mysql2",
  logging: true,
};

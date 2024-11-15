import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "src/controller/app.controller";
import { UserController } from "src/controller/user.controller";
import { UserModule } from "./user.module";
import * as session from "express-session";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "src/config/typeorm.config";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: "my-secret-key",
          resave: false,
          saveUninitialized: false,
          cookie: {
            sameSite: "lax",
            secure: false,
          },
        }),
      )
      .forRoutes("*");
  }
}

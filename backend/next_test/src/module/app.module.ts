import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "src/controller/app.controller";
import { UserController } from "src/controller/user.controller";
import { UserModule } from "./user.module";
import * as session from "express-session";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "src/config/typeorm.config";
import { ConfigModule } from "@nestjs/config";
import { TodoController } from "src/controller/todo.controller";
import { TodoModule } from "./todo.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    TodoModule,
  ],
  controllers: [AppController, UserController, TodoController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          name: "sessionId",
          secret: "my-secret",
          resave: false,
          saveUninitialized: false,
          cookie: {
            httpOnly: false,
            secure: false,
            sameSite: "lax",
            path: "/",
          },
        }),
      )
      .forRoutes("*");
  }
}

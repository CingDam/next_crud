import { NestFactory } from "@nestjs/core";
import { AppModule } from "./module/app.module";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // next에서 할때는 쿠키값을 받아서 실행
  app.use(cookieParser());

  // cors를 설정할 때 spa아닐경우 아래와 같이 origin링크와 crendetials(쿠키 받아오기):true 설정
  // react에선 package.json에 proxy로 잡아놓으면 안해도 됨
  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  });

  // 포트번호 프론트랑 다르게
  await app.listen(3001);
}
bootstrap();

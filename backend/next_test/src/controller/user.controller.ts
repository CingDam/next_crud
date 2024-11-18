import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "src/service/user.service";

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/login")
  async login(
    @Body() item: { user_id: string; user_pwd: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!req.session.user) {
      const user = await this.userService.login(item);
      if (user) {
        req.session.user = user;
        req.session.save((err) => {
          if (err) {
            console.error("세션 저장 실패:", err);
          }
          return res
            .status(200)
            .json({ message: "로그인 성공!", user: req.session.user });
        });
      } else {
        return res.status(401).json({ error: "조회 실패!" });
      }
    } else if (req.session.user) {
      console.log(req.session);
      return res
        .status(200)
        .json({ message: "로그인 성공!", user: req.session.user });
    }
  }
}

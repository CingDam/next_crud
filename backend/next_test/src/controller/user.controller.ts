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
    req.session.user = null;
    if (!req.session.user) {
      const user = await this.userService.login(item);
      if (user) {
        req.session.user = user;
        console.log("session :");
        console.log(req.session);
        return res
          .status(200)
          .json({ message: "로그인 성공!", user: req.session.user });
      } else {
        return res.status(404).json({ error: "조회 실패!" });
      }
    }
  }
}

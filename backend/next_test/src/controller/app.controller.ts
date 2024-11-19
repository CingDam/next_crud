import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

@Controller()
export class AppController {
  @Get("/session-chk")
  sessionChk(@Req() req: Request, @Res() res: Response) {
    console.log(req.session.user ? req.session.user : console.log("값이 없음"));
    if (req.session.user) {
      console.log("success");
      return res
        .status(200)
        .json({ message: "Authorized", user: req.session.user });
    } else {
      return res.status(401).json({ message: "UnAuthorized" });
    }
  }

  @Get("/logout")
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.user = null;
    return res.redirect("http://localhost:3000");
  }
}

import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

@Controller()
export class AppController {
  @Get("/gettodo")
  todo(@Req() req: Request, @Res() res: Response) {
    console.log(req.session);
    if (req.session.user) {
      return res.json({ user: req.session.user });
    }
  }

  @Get("/session-chk")
  sessionChk(@Req() req: Request, @Res() res: Response) {
    console.log("session chk :");
    console.log(req.session);
    if (req.session.user) {
      return res.status(200).json({ user: req.session.user });
    }
  }
}

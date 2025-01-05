import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { SessionService } from "./session.service";
import { HTTPSTATUS } from "../../config/http.config";
import { NotFoundException } from "../../common/utils/catch-errors";
import { z } from "zod";

export class SessionController {
  private sessionSerivce: SessionService;

  constructor(sessionSerivce: SessionService) {
    this.sessionSerivce = sessionSerivce;
  }

  public getAllSession = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.sessionId;

    const { sessions } = await this.sessionSerivce.getAllSession(userId);
    const modifySession = sessions.map((session) => ({
      ...session.toObject(),
      ...(session.id === sessionId && {
        isCurrent: true,
      }),
    }));

    return res.status(HTTPSTATUS.OK).json({
      success: true,
      message: "Retrieved all session successfully!",
      sessions: modifySession,
    });
  });

  public getSession = asyncHandler(async (req: Request, res: Response) => {
    const sessionId = req?.sessionId;
    if (!sessionId) {
      throw new NotFoundException(
        "Session ID not found, please login and try again!"
      );
    }

    const { user } = await this.sessionSerivce.getSessionById(sessionId);

    return res.status(HTTPSTATUS.OK).json({
      success: true,
      message: "Retrieved session successfully!",
      user,
    });
  });

  public deleteSession = asyncHandler(async (req: Request, res: Response) => {
    const sessionId = z.string().parse(req.params.id);
    const userId = req.user?.id;

    await this.sessionSerivce.deleteSession(sessionId, userId);

    return res.status(HTTPSTATUS.OK).json({
      success: true,
      message: "Session removed successfully!",
    });
  });
}

import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { MfaService } from "./mfa.service";
import { HTTPSTATUS } from "../../config/http.config";
import {
  verifyMFAForLoginSchema,
  verifyMFASchema,
} from "../../common/validators/mfa.validator";
import { setAuthenticationCookies } from "../../common/utils/cookie";

export class MfaController {
  private mfaService: MfaService;

  constructor(mfaService: MfaService) {
    this.mfaService = mfaService;
  }

  public generateMFASetup = asyncHandler(
    async (req: Request, res: Response) => {
      const { secretKey, qrImageUrl, message } =
        await this.mfaService.generateMFASetup(req);
      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message,
        secretKey,
        qrImageUrl,
      });
    }
  );

  public verifyMFASetup = asyncHandler(async (req: Request, res: Response) => {
    const { code, secretKey } = verifyMFASchema.parse({
      ...req.body,
    });

    const { userPreferences, message } = await this.mfaService.verifyMFASetup(
      req,
      code,
      secretKey
    );

    return res.status(HTTPSTATUS.OK).json({
      success: true,
      message,
      userPreferences: userPreferences,
    });
  });

  public revokeMFA = asyncHandler(async (req: Request, res: Response) => {
    const { message, userPreferences } = await this.mfaService.revokeMFA(req);

    return res.status(HTTPSTATUS.OK).json({
      success: true,
      message,
      userPreferences,
    });
  });

  public verifyMFAForLogin = asyncHandler(
    async (req: Request, res: Response) => {
      const { code, email, userAgent } = verifyMFAForLoginSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
      });

      const { user, accessToken, refreshToken } =
        await this.mfaService.verifyMFAForLogin(code, email, userAgent);

      return setAuthenticationCookies({
        res,
        accessToken,
        refreshToken,
      })
        .status(HTTPSTATUS.OK)
        .json({
          success: true,
          message: "User LoggedIn Successfully!",
          user,
        });
    }
  );
}

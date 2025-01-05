import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { AuthService } from "./auth.service";
import { HTTPSTATUS } from "../../config/http.config";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verificationEmailSchema,
} from "../../common/validators/auth.validator";
import {
  clearAuthenticationCookies,
  getAccessTokenCookieOptions,
  setAuthenticationCookies,
} from "../../common/utils/cookie";
import {
  NotFoundException,
  UnauthorizedException,
} from "../../common/utils/catch-errors";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public register = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body = registerSchema.parse({
        ...req.body,
      });

      const { user } = await this.authService.register(body);

      return res.status(HTTPSTATUS.CREATED).json({
        success: true,
        message: "User Registered Successfully!",
        data: user,
      });
    }
  );

  public login = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const userAgent = req.headers["user-agent"];
      const body = loginSchema.parse({
        ...req.body,
        userAgent,
      });

      const { user, accessToken, refreshToken, mfaRequired } =
        await this.authService.login(body);

      if (mfaRequired) {
        return res.status(HTTPSTATUS.OK).json({
          success: true,
          message: "Verify MFA authentication!",
          mfaRequired: true,
          user,
        });
      }

      return setAuthenticationCookies({
        res,
        accessToken,
        refreshToken,
      })
        .status(HTTPSTATUS.OK)
        .json({
          success: true,
          message: "User LoggedIn Successfully!",
          mfaRequired,
          user,
        });
    }
  );

  public refreshToken = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const refreshToken = req.cookies.refreshToken as string | undefined;
      if (!refreshToken) {
        throw new UnauthorizedException("Refresh token not found!");
      }

      const { accessToken, newRefreshToken } =
        await this.authService.refreshToken(refreshToken);

      if (newRefreshToken) {
        res.cookie(
          "refreshToken",
          newRefreshToken,
          getAccessTokenCookieOptions()
        );

        return res
          .status(HTTPSTATUS.OK)
          .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
          .json({
            success: true,
            message: "Refresh Access Token successfully",
          });
      }
    }
  );

  public verifyEmail = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { code } = verificationEmailSchema.parse(req.body);
      await this.authService.verifyEmail(code);

      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "Email verified successfully!",
      });
    }
  );

  public forgotPassword = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const email = emailSchema.parse(req.body.email);
      await this.authService.forgotPassword(email);

      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "Password reset email sent successfully!",
      });
    }
  );

  public resetPassword = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body = resetPasswordSchema.parse(req.body);

      await this.authService.resetPassword(body);

      return clearAuthenticationCookies(res).status(HTTPSTATUS.OK).json({
        success: true,
        message: "Password changed successfully!",
      });
    }
  );

  public logout = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const sessionId = req.sessionId;
      if (!sessionId) {
        throw new NotFoundException("Session is invalid or expire!");
      }

      await this.authService.logout(sessionId);

      return clearAuthenticationCookies(res).status(HTTPSTATUS.OK).json({
        success: true,
        message: "User logged out successfully!",
      });
    }
  );
}

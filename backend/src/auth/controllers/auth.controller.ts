import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';

// Extend the Request interface to include csrfToken
import { LoginDto } from '../dto/login.dto';
import { AdminAuthGuard } from '../guards/admin.auth.guard';
import { AuthService } from '../services/auth.service';
import { Throttle } from '@nestjs/throttler';
import { ConfigService } from 'src/config/config.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  private get authCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      sameSite: this.configService.isProduction ? 'none' : 'lax',
      secure: this.configService.isProduction,
    };
  }

  @Get('csrf-token')
  getCsrfToken(@Req() req: Request, @Res() res: Response): void {
    res.json({ csrfToken: req.csrfToken() });
  }

  private setAuthCookie(
    res: Response,
    name: string,
    value: string,
    maxAge: number,
  ) {
    res.cookie(name, value, {
      ...this.authCookieOptions,
      maxAge,
    });
  }

  private clearAuthCookie(res: Response, name: string) {
    res.clearCookie(name, this.authCookieOptions);
  }

  private clearAdminCookies(res: Response) {
    this.clearAuthCookie(res, 'admin_access_token');
    this.clearAuthCookie(res, 'admin_refresh_token');
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login-superadmin')
  async loginSuperAdmin(@Body() loginDto: LoginDto, @Res() res: Response) {
    const superAdmin = await this.authService.validateSuperAdmin(
      loginDto.email,
      loginDto.password,
    );

    const { access_token, refresh_token } =
      await this.authService.loginSuperAdmin(superAdmin);

    this.setAuthCookie(res, 'admin_access_token', access_token, 15 * 60 * 1000);
    this.setAuthCookie(
      res,
      'admin_refresh_token',
      refresh_token,
      7 * 24 * 60 * 60 * 1000,
    );

    return res.send({ message: 'Login successful' });
  }

  @Post('admin-refresh-token')
  async adminRefreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['admin_refresh_token'];

    if (!refreshToken) {
      // If refresh token is not found, clear cookies and log the user out
      this.clearAdminCookies(res);
      return res
        .status(401)
        .send({ message: 'Refresh token not found. Logged out successfully.' });
    }

    try {
      const { access_token, refresh_token: newRefreshToken } =
        await this.authService.adminRefreshToken(refreshToken);

      this.setAuthCookie(
        res,
        'admin_access_token',
        access_token,
        15 * 60 * 1000,
      );
      this.setAuthCookie(
        res,
        'admin_refresh_token',
        newRefreshToken,
        7 * 24 * 60 * 60 * 1000,
      );
      return res.send({ message: 'Token refreshed' });
    } catch (error) {
      this.clearAdminCookies(res);
      return res
        .status(401)
        .send({ message: 'Invalid refresh token or expired session.' });
    }
  }

  @Post('admin-logout')
  async adminLogout(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['admin_refresh_token'];

    if (refreshToken) {
      await this.authService.invalidateAdminRefreshToken(refreshToken);
    }

    this.clearAdminCookies(res);

    return res.send({ message: 'Logout successful' });
  }

  @Get('admin')
  @UseGuards(AdminAuthGuard)
  getAdminMe(@Req() req: Request) {
    return { user: req.user };
  }
}

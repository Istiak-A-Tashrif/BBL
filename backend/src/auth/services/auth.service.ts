import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Algorithm } from 'jsonwebtoken';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private get jwtAlgorithm(): Algorithm {
    return this.configService.jwtAlgorithm as Algorithm;
  }

  private signToken(
    payload: Record<string, unknown>,
    expiresIn: string,
  ): string {
    return this.jwtService.sign(payload, {
      expiresIn,
      algorithm: this.jwtAlgorithm,
    });
  }

  private verifyToken(refreshToken: string) {
    return this.jwtService.verify(refreshToken, {
      algorithms: [this.jwtAlgorithm],
    });
  }

  getAdminProfile() {
    return {
      id: 1,
      email: this.configService.adminEmail,
      name: this.configService.adminName,
      role: 'admin',
      permissions: ['cms'],
    };
  }

  async loginSuperAdmin(superAdmin: { email: string; id: number }) {
    try {
      const payload = { email: superAdmin.email, sub: superAdmin.id };
      const refreshToken = this.signToken(
        payload,
        this.configService.jwtRefreshExpiration,
      );

      return {
        access_token: this.signToken(payload, this.configService.jwtExpiration),
        refresh_token: refreshToken,
      };
    } catch (error) {
      this.logger.error(
        `Error occurred while logging in super admin for ${superAdmin.email}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to login super admin',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateSuperAdmin(email: string, pass: string): Promise<any> {
    try {
      if (email !== this.configService.adminEmail) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (pass !== this.configService.adminPassword) {
        throw new HttpException("Password doesn't match", HttpStatus.FORBIDDEN);
      }

      return this.getAdminProfile();
    } catch (error) {
      if (error instanceof HttpException) throw error;
      this.logger.error(
        `Error occurred while validating super admin for ${email}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to validate super admin',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async adminRefreshToken(refreshToken: string) {
    try {
      const payload = this.verifyToken(refreshToken);

      if (
        payload.sub !== 1 ||
        payload.email !== this.configService.adminEmail
      ) {
        throw new HttpException(
          'Invalid refresh token',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const tokenPayload = { email: payload.email, sub: payload.sub };
      const newRefreshToken = this.signToken(
        tokenPayload,
        this.configService.jwtRefreshExpiration,
      );

      const newAccessToken = this.signToken(
        tokenPayload,
        this.configService.jwtExpiration,
      );

      return { access_token: newAccessToken, refresh_token: newRefreshToken };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        'Error occurred while refreshing admin token',
        errorStack,
      );
      throw new HttpException(
        'Failed to refresh admin token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async invalidateAdminRefreshToken(refreshToken: string): Promise<void> {
    try {
      if (!this.jwtService.decode(refreshToken)) {
        throw new Error('Invalid refresh token');
      }
    } catch (error) {
      this.logger.error(
        'Error occurred while invalidating admin refresh token',
        error.stack,
      );
      throw new HttpException(
        'Failed to invalidate admin refresh token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

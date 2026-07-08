import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV') || 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get port(): number {
    return this.configService.get<number>('PORT') || 8000;
  }

  get jwtSecret(): string {
    const secret = this.configService.get<string>('JWT_SECRET_KEY');
    if (!secret) {
      throw new Error('JWT_SECRET_KEY is not defined in environment variables');
    }

    return secret;
  }

  get csrfSecret(): string {
    return this.configService.get<string>('CSRF_SECRET_KEY') || this.jwtSecret;
  }

  get jwtAlgorithm(): string {
    return this.configService.get<string>('JWT_ALGORITHM') || 'HS256';
  }

  get jwtExpiration(): string {
    return this.configService.get<string>('JWT_EXPIRATION') || '15m';
  }

  get jwtRefreshExpiration(): string {
    return this.configService.get<string>('JWT_REFRESH_EXPIRATION') || '7d';
  }

  get adminEmail(): string {
    return this.configService.get<string>('ADMIN_EMAIL') || 'admin@bbl.test';
  }

  get adminPassword(): string {
    return this.configService.get<string>('ADMIN_PASSWORD') || 'admin123';
  }

  get adminName(): string {
    return this.configService.get<string>('ADMIN_NAME') || 'BBL Admin';
  }

  get databaseUrl(): string {
    const url = this.configService.get<string>('DATABASE_URL');
    if (!url) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }
    return url;
  }

  // Database configuration
  get dbHost(): string {
    return this.configService.get<string>('DB_HOST') || 'localhost';
  }

  get dbPort(): number {
    return this.configService.get<number>('DB_PORT') || 5432;
  }

  get dbUsername(): string {
    const username = this.configService.get<string>('DB_USERNAME');
    if (!username) {
      throw new Error('DB_USERNAME is not defined in environment variables');
    }
    return username;
  }

  get dbPassword(): string {
    const password = this.configService.get<string>('DB_PASSWORD');
    if (!password) {
      throw new Error('DB_PASS is not defined in environment variables');
    }
    return password;
  }

  get dbName(): string {
    const name = this.configService.get<string>('DB_NAME');
    if (!name) {
      throw new Error('DB_NAME is not defined in environment variables');
    }
    return name;
  }

  // CORS settings
  get corsOrigins(): string[] {
    const origins = this.configService.get<string>('CORS_ORIGINS');
    return origins
      ? origins.split(',')
      : [
          'http://localhost:3001',
          'http://localhost:3000',
          'http://localhost:5173',
        ];
  }

  // Postgres binaries paths
  get pgDumpPath(): string {
    // In Docker: 'pg_dump' (installed via apk)
    // In local dev: Full path to DBngin binary
    return this.configService.get<string>('PG_DUMP_PATH') || 'pg_dump';
  }

  get psqlPath(): string {
    // In Docker: 'psql' (installed via apk)
    // In local dev: Full path to DBngin binary
    return this.configService.get<string>('PSQL_PATH') || 'psql';
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'BBL CMS API';
  }

  async getHealth() {
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: 'unknown',
          latency: 0,
          connections: 0,
        },
      },
    };

    // Check database
    try {
      const dbHealth = await this.prisma.healthCheck();
      if (dbHealth.healthy) {
        health.services.database = {
          status: 'healthy',
          latency: dbHealth.latency || 0,
          connections: dbHealth.connections || 0,
        };
      } else {
        health.services.database = {
          status: `unhealthy: ${dbHealth.error}`,
          latency: 0,
          connections: 0,
        };
        health.status = 'degraded';
      }
    } catch (error) {
      health.services.database = {
        status: `unhealthy: ${error.message}`,
        latency: 0,
        connections: 0,
      };
      health.status = 'degraded';
    }

    return health;
  }

  async getMetrics() {
    const metrics = {
      timestamp: new Date().toISOString(),
      database: null as any,
      process: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
      },
    };

    try {
      const dbMetrics = await this.prisma.getPoolMetrics();
      metrics.database = dbMetrics;
    } catch (error) {
      metrics.database = {
        error: error.message,
      };
    }

    return metrics;
  }
}

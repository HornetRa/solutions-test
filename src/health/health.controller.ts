import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HealthIndicatorFunction } from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const checkDatabase: HealthIndicatorFunction = async () => {
      await this.prisma.$queryRaw`SELECT 1`;
      return { database: { status: 'up' } };
    };

    return this.health.check([checkDatabase]);
  }
}

import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

@Controller()
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly http: HttpHealthIndicator,
  ) {}

  @Get('health')
  checkHealth() {
    return 'ok';
  }

  @Get('status')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.http.pingCheck('server-api', 'http://localhost:30031/health'),
    ]);
  }
}

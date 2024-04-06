import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OctokitModule } from 'nestjs-octokit';
import { HealthModule } from './health/health.module';
import { IssueController } from './issue/issue.controller';
import { MonitoringModule } from './monitoring/monitoring.module';

@Module({
  imports: [
    HealthModule,
    MonitoringModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    OctokitModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          octokitOptions: {
            auth: config.get<string>('GITHUB_AUTH_TOKEN'),
          },
        };
      },
    }),
  ],
  controllers: [IssueController],
})
export class AppModule {}

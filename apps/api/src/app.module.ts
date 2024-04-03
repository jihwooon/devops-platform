import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { OctokitModule } from 'nestjs-octokit';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { IssueController } from './issue/issue.controller';

@Module({
  imports: [
    TerminusModule,
    HttpModule,
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
  controllers: [AppController, HealthController, IssueController],
  providers: [AppService],
})
export class AppModule {}

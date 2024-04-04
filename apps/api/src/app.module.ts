import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OctokitModule } from 'nestjs-octokit';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { IssueController } from './issue/issue.controller';

@Module({
  imports: [
    HealthModule,
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
  controllers: [AppController, IssueController],
  providers: [AppService],
})
export class AppModule {}

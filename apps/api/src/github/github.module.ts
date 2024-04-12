import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OctokitModule } from 'nestjs-octokit';
import { IssueController } from './issues/issue.controller';

@Module({
  imports: [
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
export class GithubModule {}

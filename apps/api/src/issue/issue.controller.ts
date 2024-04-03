import { Controller, Get, Param, Query } from '@nestjs/common';
import { OctokitService } from 'nestjs-octokit';

@Controller('git')
export class IssueController {
  constructor(private readonly octokitService: OctokitService) {}

  @Get('/login')
  async getLogin() {
    const {
      data: { login },
    } = await this.octokitService.rest.users.getAuthenticated();

    return login;
  }

  @Get('/repo')
  async getRepo(@Query('repo_name') repoName: string) {
    const owner = await this.getLogin();
    const {
      data: { name },
    } = await this.octokitService.rest.repos.get({
      owner,
      repo: repoName,
    });

    return name;
  }

  @Get('repo/:repo_name/issues/:issue_number')
  async getIssues(
    @Param('issue_number') issueNumber: string,
    @Param('repo_name') repoName: string,
  ): Promise<any> {
    const owner = await this.getLogin();
    const repo = await this.getRepo(repoName);

    const {
      data: { title, body },
    } = await this.octokitService.rest.issues.get({
      owner,
      repo,
      issue_number: parseInt(issueNumber),
    });

    return {
      title,
      body,
    };
  }
}

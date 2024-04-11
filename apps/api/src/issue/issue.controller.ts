import { Controller, Get, Param, Query } from '@nestjs/common';
import { OctokitService } from 'nestjs-octokit';
import { IssueDto } from './dto/issue.dto';

@Controller('git')
export class IssueController {
  constructor(private readonly octokitService: OctokitService) {}

  /**
   * 인증된 사용자의 로그인 이름을 가져옵니다.
   * @returns 로그인 이름입니다.
   */
  @Get('/login')
  async getLogin() {
    const {
      data: { login },
    } = await this.octokitService.rest.users.getAuthenticated();

    return login;
  }

  /**
   * 제공된 저장소 이름을 기반으로 저장소의 이름을 가져옵니다.
   * @param repoName - 저장소의 이름
   * @returns 저장소의 이름입니다.
   */
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

  /**
   * 제공된 저장소 이름과 이슈 번호를 기반으로 이슈의 제목과 내용을 가져옵니다.
   * @param issueNumber - 이슈 번호
   * @param repoName - 저장소의 이름
   * @returns 이슈의 제목을 포함한 객체입니다.
   */
  @Get('repo/:repo_name/issues/:issue_number')
  async getIssues(
    @Param('issue_number') issueNumber: string,
    @Param('repo_name') request: string,
  ): Promise<any> {
    const owner = await this.getLogin();
    const repo = await this.getRepo(request);

    const response = await this.octokitService.rest.issues.get({
      owner,
      repo,
      issue_number: parseInt(issueNumber),
    });

    return IssueDto.Response.of(response, owner);
  }
}

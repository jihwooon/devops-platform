import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OctokitService } from 'nestjs-octokit';
import { IssueResponseDto } from './dto/issue.dto';

@Controller('git')
export class IssueController {
  constructor(private octokitService: OctokitService) {}

  /**
   * 제공된 저장소 이름과 이슈 번호를 기반으로 이슈의 제목과 내용을 가져옵니다.
   * @param issueNumber - 이슈 번호
   * @param repoName - 저장소의 이름
   * @returns 이슈의 제목을 포함한 객체입니다.
   */
  @Get('repo/:repo_name/issues/:issue_number')
  @ApiOperation({
    description: 'Returns information about an issue',
  })
  @ApiResponse({
    status: 200,
    type: IssueResponseDto,
  })
  async getIssues(
    @Param('issue_number') issueNumber: string,
    @Param('repo_name') repoName: string,
  ): Promise<IssueResponseDto> {
    const owner = await this.getLogin();
    const repo = await this.getRepo(repoName);

    const response = await this.octokitService.rest.issues.get({
      owner,
      repo,
      issue_number: parseInt(issueNumber),
    });

    return IssueResponseDto.of(response, owner);
  }

  /**
   * 인증된 사용자의 로그인 이름을 가져옵니다.
   * @returns 로그인 이름입니다.
   */
  private async getLogin() {
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
  private async getRepo(repoName: string) {
    const owner = await this.getLogin();
    const {
      data: { name },
    } = await this.octokitService.rest.repos.get({
      owner,
      repo: repoName,
    });

    return name;
  }
}

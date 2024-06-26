import { Test, TestingModule } from '@nestjs/testing';
import { OctokitService } from 'nestjs-octokit';
import { describe } from 'vitest';
import { IssueController } from './issue.controller';

describe('IssueController', () => {
  let controller: IssueController;
  let fakeService: Partial<OctokitService>;

  beforeEach(async () => {
    fakeService = {
      rest: {
        users: {
          getAuthenticated: () => {
            return Promise.resolve({
              data: {
                login: 'octocat',
              },
            });
          },
        },
        repos: {
          get: () => {
            return Promise.resolve({
              data: {
                name: 'github-repo',
              },
            });
          },
        },
        issues: {
          get: () => {
            return Promise.resolve({
              owner: 'octocat',
              data: {
                title: 'issue-title',
                body: 'Im having a problem with this.',
                state: 'open',
                labels: [
                  {
                    name: 'bug',
                  },
                  {
                    name: 'documentation',
                  },
                ],
                assignees: [
                  {
                    login: 'octocat',
                  },
                ],
              },
              url: 'https://api.github.com/repos/octocat/Hello-World/issues/1347',
            });
          },
        },
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [IssueController],
      providers: [
        {
          provide: OctokitService,
          useValue: fakeService,
        },
      ],
    }).compile();

    controller = module.get<IssueController>(IssueController);
  });

  describe('Github 로그인 정보를 호출 시', () => {
    it('해당 로그인 아이디를 리턴한다', async () => {
      const login = await controller.getLogin();

      expect(login).toBe('octocat');
    });
  });

  describe('Github Repo 정보를 검색 시', () => {
    it('해당 저장소의 이름을 리턴한다', async () => {
      const repoName = await controller.getRepo('github-repo');

      expect(repoName).toBe('github-repo');
    });
  });

  describe('Github Repo 이름과 이슈 번호가 주어지면', () => {
    it('해당 이슈의 제목과 내용을 리턴한다', async () => {
      const issue = await controller.getIssues('1', 'github-repo');

      expect(issue).toEqual({
        owner: 'octocat',
        title: 'issue-title',
        body: 'Im having a problem with this.',
        state: 'open',
        url: 'https://api.github.com/repos/octocat/Hello-World/issues/1347',
        labels: ['bug', 'documentation'],
        assignees: ['octocat'],
      });
    });
  });
});

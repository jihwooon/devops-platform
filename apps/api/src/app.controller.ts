import { Controller, Get } from '@nestjs/common';
import { OctokitService } from 'nestjs-octokit';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly octokitService: OctokitService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/login')
  async getOctokit() {
    const response = (
      await this.octokitService.rest.search.users({ q: 'jihwooon' })
    ).data.items[0]?.login;

    return response;
  }

  @Get('/projects')
  async getProjects() {
    const response = await this.octokitService.graphql(
      `query project ($login: String! $project: Int!) {
      user (login: $login) {
                  projectV2(number: $project) {
                    id
                    items(first: 3) {
                      nodes {
                      fieldValues(first:20){
                          nodes {
                          __typename
                          ... on ProjectV2ItemFieldUserValue {
                              field {
                              ...on ProjectV2Field {
                                  name
                              }
                              }
                              users(first: 5) {
                              nodes {
                                  ...on ProfileOwner {
                                      name
                                      login
                                  }
                              }
                              }
                          }
                          ... on ProjectV2ItemFieldDateValue {
                              field {
                              ... on ProjectV2Field {
                                  name
                              }
                              }
                              date
                          }
                          ... on ProjectV2ItemFieldNumberValue {
                              field {
                              ... on ProjectV2Field {
                                  name
                              }
                              }
                              number
                          }
                          ... on ProjectV2ItemFieldTextValue {
                              field {
                              ... on ProjectV2Field {
                                  name
                              }
                              }
                              text
                              }
                          ... on ProjectV2ItemFieldSingleSelectValue {
                              field {
                              ... on ProjectV2SingleSelectField {
                                  name
                              }
                              }
                              name

                              }
                          ... on ProjectV2ItemFieldDateValue {
                              date
                              }
                          }
                      }
                  }
              }
          }
      }
  }`,
      {
        login: 'jihwooon',
        project: 23,
      },
    );

    return response;
  }
}

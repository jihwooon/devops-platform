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

  @Get('/octo')
  async getOctokit() {
    const response = await this.octokitService.graphql(`{
      viewer {
        login
      }
    }`);

    return response;
  }
}

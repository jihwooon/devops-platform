import { ApiProperty } from '@nestjs/swagger';

/**
 * Issue Response
 */
export class IssueResponseDto {
  @ApiProperty({ description: 'The owner of the issue' })
  owner: string;

  @ApiProperty({ description: 'The state of the issue' })
  state: string;

  @ApiProperty({ description: 'The URL of the repository' })
  url: string;

  @ApiProperty({ description: 'The title of the issue' })
  title: string;

  @ApiProperty({ description: 'The body of the issue' })
  body: string;

  @ApiProperty({ description: 'The labels of the issue' })
  labels: string[];

  @ApiProperty({ description: 'The assignees of the issue' })
  assignees: string[];

  static of(response: any, owner: string): IssueResponseDto {
    const labels: string[] = response.data.labels.map((label) => label.name);
    labels.filter((label) => label !== '');

    if (labels.length === 0) {
      labels.push('No labels exist.');
    }

    const assignees: string[] = response.data.assignees.map(
      (assignee) => assignee.login,
    );

    assignees.filter((login) => login !== '');

    if (assignees.length === 0) {
      assignees.push('No assignee is specified.');
    }

    return {
      title: response.data.title,
      body: response.data.body,
      labels,
      state: response.data.state,
      url: response.url,
      owner,
      assignees,
    };
  }
}

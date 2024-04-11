export class IssueDto {
  static Response = class {
    owner: string;
    state: string;
    url: string;
    title: string;
    body: string;
    labels: string[];
    assignees: string[];

    static of(response: any, owner: string): IssueDto {
      const labels: string[] = response.data.labels.map((label) => label.name);
      labels.filter((label) => label !== '');

      if (labels.length === 0) {
        labels.push('label이 존재하지 않습니다.');
      }

      const assignees: string[] = response.data.assignees.map(
        (assignee) => assignee.login,
      );

      assignees.filter((login) => login !== '');

      if (assignees.length === 0) {
        assignees.push('assignee이 지정되어 있지 않습니다.');
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
  };
}


export class CreateUpdateTodoDto {
  readonly title?: string;
  readonly description: string;
  readonly assignee: string[]; // id`s
  readonly list: string; // id
}
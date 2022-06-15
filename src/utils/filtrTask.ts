import { TaskType } from 'type';

export const filterTasks = (arrayElement: TaskType[], filterValue: number): TaskType[] =>
  arrayElement.filter(element => element.status === filterValue);

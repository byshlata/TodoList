import { TaskPriority, TaskStatuses } from 'enum';
import { StringNullType } from 'type/appType';

export type ResponseEveryType<T = {}> = {
  resultCode: number;
  messages: string[];
  fieldsErrors: string[];
  data: T;
};

export type TodolistResponseType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type TodolistCreateType = { item: TodolistResponseType };

export type TaskType = UpdateTaskType & {
  addedDate: string;
  order: number;
};

export type GetTasksResponseType = {
  items: TaskType[];
  totalCount: number;
  error: string;
};

export type UpdateTaskType = {
  description: StringNullType;
  title: string;
  status: TaskStatuses;
  priority: TaskPriority;
  todoListId: string;
  startDate: StringNullType;
  deadline: StringNullType;
  id: string;
};

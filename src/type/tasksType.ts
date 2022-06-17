import { TaskType } from './apiType';

export type TasksType = {
  [key: string]: TaskType[];
};

export type GetTasksType = {
  idTodoList: string;
  count: number;
  page: number;
};

export type RemoveTaskPayloadActionType = {
  idTask: string;
  idTodoList: string;
};

export type GetTaskPayloadActionType = {
  idTodoList: string;
  tasks: TaskType[];
};

export type CreateTaskActionType = {
  title: string;
  idTodoList: string;
};

export type DeleteTaskActionType = {
  idTask: string;
  idTodoList: string;
};

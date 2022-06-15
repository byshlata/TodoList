import { TaskType } from './apiType';

export type TasksType = {
  [key: string]: TaskType[];
};

export type getTasksType = {
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

export type createTaskActionType = {
  title: string;
  idTodoList: string;
};

export type deleteTaskActionType = {
  idTask: string;
  idTodoList: string;
};

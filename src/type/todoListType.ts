import { TodolistResponseType } from './apiType';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type backgroundColorType =
  | 'main'
  | 'primary'
  | 'secondary'
  | 'additional'
  | 'best';

export type TodoListType = TodolistResponseType & {
  filter: FilterValuesType;
  amountTasks: number;
  backgroundColor: backgroundColorType;
};

export type TodoListActionType = {
  idTodoList: string;
};

export type UpdateTitleTodoListActionType = TodoListActionType & {
  title: string;
};

export type UpdateFilterTodoListActionType = TodoListActionType & {
  filter: FilterValuesType;
};

export type ChangeBackgroundTodoListActionType = TodoListActionType & {
  backgroundColor: backgroundColorType;
};

export type ErrorRejectedType = {
  error: {};
  meta: {};
  payload: string;
  type: string;
};

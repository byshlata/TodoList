import { TodolistResponseType } from './apiType';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type BackgroundColorType =
  | 'main'
  | 'primary'
  | 'secondary'
  | 'additional'
  | 'best';

export type TodoListType = TodolistResponseType & {
  filter: FilterValuesType;
  amountTasks: number;
  backgroundColor: BackgroundColorType;
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
  backgroundColor: BackgroundColorType;
};

export type ErrorRejectedType = {
  error: {};
  meta: {};
  payload: string;
  type: string;
};

import { AppRootStore } from 'state/store';
import { LanguageType, StringNullType, ThemeType } from 'type/appType';
import { TodoListType } from 'type/todoListType';

export const theme = (state: AppRootStore): ThemeType => state.app.theme;

export const isLoadingElement = (state: AppRootStore): boolean => state.app.isLoading;

export const errorMessage = (state: AppRootStore): StringNullType =>
  state.app.errorMessage;

export const todoList = (state: AppRootStore): TodoListType[] => state.todoList;

export const isDragDrop = (state: AppRootStore): boolean => state.app.isDragDrop;

export const languageNow = (state: AppRootStore): LanguageType => state.app.language;

export const isLoadingUser = (state: AppRootStore): boolean => state.auth.isLoadingUser;

import { BackgroundColorType } from './todoListType';

export type FilterValueType = 'all' | 'completed' | 'active' | 'undo';

export type ThemeType = 'themeLight' | 'themeDark';

export type TodoLocalStorageType = {
  [key: string]: BackgroundColorType;
};

export type StringNullType = string | null;

export type LanguageType = 'EN' | 'BY' | 'RU';

export type AppType = {
  isLoading: boolean;
  errorMessage: StringNullType;
  theme: ThemeType;
  todolistBackgroundColor: TodoLocalStorageType;
  isDragDrop: boolean;
  language: LanguageType;
  isInitialized: boolean;
};

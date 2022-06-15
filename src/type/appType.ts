import { backgroundColorType } from './todoListType';

export type FilterValueType = 'all' | 'completed' | 'active' | 'undo';

export type ThemeType = 'themeLight' | 'themeDark';

export type todoLocalStorageType = {
  [key: string]: backgroundColorType;
};

export type StringNullType = string | null;

export type LanguageType = 'EN' | 'BY' | 'RU';

export type AppType = {
  isLoading: boolean;
  errorMessage: StringNullType;
  theme: ThemeType;
  todolistBackgroundColor: todoLocalStorageType;
  isDragDrop: boolean;
  language: LanguageType;
};

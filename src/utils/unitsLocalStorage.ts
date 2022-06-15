import { ThemeType, todoLocalStorageType, TodoListType, LanguageType } from 'type';

export const loadStateTheme = (): ThemeType => {
  try {
    const themeSave = localStorage.getItem('themeSave');

    if (themeSave === null) {
      return 'themeLight' as const;
    }
    return JSON.parse(themeSave) as ThemeType;
  } catch (err) {
    return 'themeLight' as const;
  }
};

export const loadStateLanguage = (): LanguageType => {
  try {
    const languageSave = localStorage.getItem('languageSave');

    if (languageSave === null) {
      return 'EN' as const;
    }
    return JSON.parse(languageSave) as LanguageType;
  } catch (err) {
    return 'EN' as const;
  }
};

export const loadStateTodoList = (): {} => {
  try {
    const todoListSave = localStorage.getItem('todoListSave');
    if (todoListSave === null) {
      return {};
    }
    return JSON.parse(todoListSave);
  } catch (err) {
    return {};
  }
};

export const saveState = (state: {
  todolist: TodoListType[];
  theme: ThemeType;
  language: LanguageType;
}): void => {
  try {
    const todolistBackgroundColor: todoLocalStorageType = {};

    state.todolist.forEach(element => {
      todolistBackgroundColor[element.id] = element.backgroundColor;
    });

    localStorage.setItem('todoListSave', JSON.stringify(todolistBackgroundColor));
    localStorage.setItem('themeSave', JSON.stringify(state.theme));
    localStorage.setItem('languageSave', JSON.stringify(state.language));
  } catch {
    throw new Error('Error save to Local Storage');
  }
};

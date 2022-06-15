import { configureStore } from '@reduxjs/toolkit';

import { appSlice } from './slice/appSlice';
import { tasksSlice } from './slice/tasksSlice';
import { todoListSlice } from './slice/todoListSlice';

import { loadStateLanguage, loadStateTheme, loadStateTodoList, saveState } from 'utils';

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    todoList: todoListSlice.reducer,
    app: appSlice.reducer,
  },
  preloadedState: {
    app: {
      theme: loadStateTheme(),
      errorMessage: null,
      isLoading: false,
      todolistBackgroundColor: loadStateTodoList(),
      isDragDrop: false,
      language: loadStateLanguage(),
    },
  },
});

export type AppRootStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  saveState({
    todolist: store.getState().todoList,
    theme: store.getState().app.theme,
    language: store.getState().app.language,
  });
});

// @ts-ignore
window.store = store;

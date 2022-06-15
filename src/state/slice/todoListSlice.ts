import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  ChangeBackgroundTodoListActionType,
  GetTaskPayloadActionType,
  RemoveTaskPayloadActionType,
  TaskType,
  TodoListActionType,
  TodoListType,
  UpdateFilterTodoListActionType,
  UpdateTitleTodoListActionType,
} from '../../type';

import { tasksSlice } from './tasksSlice';

const ONE_TASK = 1;

const initialState: TodoListType[] = [];

export const todoListSlice = createSlice({
  name: 'todolistSlice',
  initialState,
  reducers: {
    setTodoList: (state, action: PayloadAction<TodoListType[]>) => action.payload,

    removeTodoList: (state, action: PayloadAction<TodoListActionType>) =>
      state.filter(f => f.id !== action.payload.idTodoList),

    addTodoList: (state, action: PayloadAction<TodoListType>) => {
      state.unshift(action.payload);
    },

    changeTodoListTitle: (
      state,
      action: PayloadAction<UpdateTitleTodoListActionType>,
    ) => {
      state.forEach((todoList): void => {
        if (todoList.id === action.payload.idTodoList) {
          todoList.title = action.payload.title;
        }
      });
    },

    changeTodoListFilter: (
      state,
      action: PayloadAction<UpdateFilterTodoListActionType>,
    ) => {
      state.forEach(todoList => {
        if (todoList.id === action.payload.idTodoList) {
          todoList.filter = action.payload.filter;
        }
      });
    },

    changeBackgroundColor: (
      state,
      action: PayloadAction<ChangeBackgroundTodoListActionType>,
    ) => {
      state.forEach(todoList => {
        if (todoList.id === action.payload.idTodoList) {
          todoList.backgroundColor = action.payload.backgroundColor;
        }
      });
    },
  },

  extraReducers: builder => {
    builder.addCase(
      tasksSlice.actions.setTasks,
      (state, action: PayloadAction<GetTaskPayloadActionType>) => {
        state.forEach(todoList => {
          if (todoList.id === action.payload.idTodoList) {
            todoList.amountTasks = action.payload.tasks.length;
          }
        });
      },
    );

    builder.addCase(
      tasksSlice.actions.addTask,
      (state, action: PayloadAction<TaskType>) => {
        state.forEach((todoList): void => {
          if (todoList.id === action.payload.todoListId) {
            todoList.amountTasks += ONE_TASK;
          }
        });
      },
    );

    builder.addCase(
      tasksSlice.actions.removeTask,
      (state, action: PayloadAction<RemoveTaskPayloadActionType>) => {
        state.forEach((todoList): void => {
          if (todoList.id === action.payload.idTodoList) {
            todoList.amountTasks -= ONE_TASK;
          }
        });
      },
    );
  },
});

export const {
  removeTodoList,
  addTodoList,
  changeTodoListTitle,
  changeTodoListFilter,
  setTodoList,
  changeBackgroundColor,
} = todoListSlice.actions;

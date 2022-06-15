import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  TaskType,
  GetTaskPayloadActionType,
  RemoveTaskPayloadActionType,
  TasksType,
  TodoListActionType,
  TodoListType,
} from '../../type';

import { todoListSlice } from './todoListSlice';

const initialState: TasksType = {};

export const tasksSlice = createSlice({
  name: 'taskSlice',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<GetTaskPayloadActionType>) => {
      state[action.payload.idTodoList] = action.payload.tasks;
    },

    removeTask: (state, action: PayloadAction<RemoveTaskPayloadActionType>) => {
      state[action.payload.idTodoList] = state[action.payload.idTodoList].filter(
        task => task.id !== action.payload.idTask,
      );
    },

    changeTask: (state, action: PayloadAction<TaskType>) => ({
      ...state,
      [action.payload.todoListId]: state[action.payload.todoListId].map(m =>
        m.id === action.payload.id ? action.payload : m,
      ),
    }),
    addTask: (state, action: PayloadAction<TaskType>) => {
      state[action.payload.todoListId].unshift(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(
      todoListSlice.actions.removeTodoList,
      (state, action: PayloadAction<TodoListActionType>) => {
        delete state[action.payload.idTodoList];
      },
    );
    builder.addCase(
      todoListSlice.actions.addTodoList,
      (state, action: PayloadAction<TodoListType>) => {
        state[action.payload.id] = [];
      },
    );
    builder.addCase(
      todoListSlice.actions.setTodoList,
      (state, action: PayloadAction<TodoListType[]>) => {
        const newState: TasksType = {};
        action.payload.forEach(({ id }): void => {
          newState[id] = [];
        });
        return newState;
      },
    );
  },
});

export const { removeTask, addTask, changeTask, setTasks } = tasksSlice.actions;

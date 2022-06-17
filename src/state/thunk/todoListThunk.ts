import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Api } from 'api/api';
import { ColorTodolist, FilterStatus, ErrorArrayResponse, ResultCode } from 'enum';
import {
  AppRootStore,
  changeStateLoading,
  addTodoList,
  changeTodoListTitle,
  removeTodoList,
  setTodoList,
} from 'state';
import { BackgroundColorType, UpdateTitleTodoListActionType } from 'type';

export const getTodoList = createAsyncThunk(
  'todoListSlice/getTodoList',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as AppRootStore;

      dispatch(changeStateLoading(true));

      const res = await Api.getTodolists();
      if (res.length) {
        const todoListBackgroundColor = state.app.todolistBackgroundColor;

        const todoList = res.map(({ id, title, addedDate, order }) => {
          let backgroundColor: BackgroundColorType = ColorTodolist.main;
          if (todoListBackgroundColor[id]) {
            backgroundColor = todoListBackgroundColor[id];
          }
          return {
            id,
            title,
            addedDate,
            order,
            filter: FilterStatus.all,
            amountTasks: 0,
            backgroundColor,
          };
        });
        dispatch(setTodoList(todoList));
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.message);
      }
    } finally {
      dispatch(changeStateLoading(false));
    }
  },
);

export const createTodoList = createAsyncThunk(
  'todoListSlice/createTodoList',
  // eslint-disable-next-line consistent-return
  async (title: string, { rejectWithValue, dispatch }) => {
    try {
      dispatch(changeStateLoading(true));

      const res = await Api.createTodolist(title);
      const todoList = {
        ...res.data.item,
        filter: FilterStatus.all,
        amountTasks: 0,
        backgroundColor: ColorTodolist.main,
      };
      dispatch(addTodoList(todoList));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.message);
      }
    } finally {
      dispatch(changeStateLoading(false));
    }
  },
);

export const deleteTodoList = createAsyncThunk(
  'todoListSlice/deleteTodoList',
  // eslint-disable-next-line consistent-return
  async (idTodoList: string, { rejectWithValue, dispatch }) => {
    try {
      dispatch(changeStateLoading(true));

      await Api.deleteTodoList(idTodoList);
      dispatch(removeTodoList({ idTodoList }));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.message);
      }
    } finally {
      dispatch(changeStateLoading(false));
    }
  },
);

export const updateTodoListTitle = createAsyncThunk(
  'todoListSlice/updateTodoListTitle',
  // eslint-disable-next-line consistent-return
  async (value: UpdateTitleTodoListActionType, { rejectWithValue, dispatch }) => {
    try {
      dispatch(changeStateLoading(true));

      const responseValue = await Api.updateTodolistTitle(value.idTodoList, value.title);
      if (responseValue.resultCode === ResultCode.errorRequest) {
        return rejectWithValue(responseValue.messages[ErrorArrayResponse.firstElement]);
      }
      dispatch(changeTodoListTitle({ ...value }));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.message);
      }
    } finally {
      dispatch(changeStateLoading(false));
    }
  },
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Api } from 'api/api';
import { ErrorArrayResponse, ResultCode } from 'enum';
import { changeStateLoading, addTask, changeTask, removeTask, setTasks } from 'state';
import { UpdateTaskType, createTaskActionType, deleteTaskActionType } from 'type';
import { changeDescriptionArrayTask, changeDescriptionTask } from 'utils';

export const getTasks = createAsyncThunk(
  'tasksSlice/getTasks',
  // eslint-disable-next-line consistent-return
  async (idTodoList: string, { rejectWithValue, dispatch }) => {
    try {
      dispatch(changeStateLoading(true));
      let res = await Api.getTasks(idTodoList);
      res = changeDescriptionArrayTask(res);
      dispatch(setTasks({ idTodoList, tasks: res.items }));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.message);
      }
    } finally {
      dispatch(changeStateLoading(false));
    }
  },
);

export const createTask = createAsyncThunk(
  'tasksSlice/createTask',
  // eslint-disable-next-line consistent-return
  async (value: createTaskActionType, { rejectWithValue, dispatch }) => {
    try {
      dispatch(changeStateLoading(true));

      const res = await Api.createTask(value.idTodoList, value.title);

      changeDescriptionTask(res);

      dispatch(addTask(res.data.item));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.message);
      }
    } finally {
      dispatch(changeStateLoading(false));
    }
  },
);

export const deleteTask = createAsyncThunk(
  'tasksSlice/deleteTask',
  // eslint-disable-next-line consistent-return
  async (value: deleteTaskActionType, { rejectWithValue, dispatch }) => {
    try {
      dispatch(changeStateLoading(true));

      await Api.deleteTask(value.idTodoList, value.idTask);
      dispatch(removeTask({ ...value }));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.message);
      }
    } finally {
      dispatch(changeStateLoading(false));
    }
  },
);

export const updateTask = createAsyncThunk(
  'tasksSlice/updateTask',
  // eslint-disable-next-line consistent-return
  async (value: UpdateTaskType, { rejectWithValue, dispatch }) => {
    try {
      dispatch(changeStateLoading(true));

      const task = await Api.updateTask(value);
      if (task.data.resultCode === ResultCode.errorRequest) {
        return rejectWithValue(task.data.messages[ErrorArrayResponse.firstElement]);
      }
      dispatch(changeTask(task.data.data.item));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.message);
      }
    } finally {
      dispatch(changeStateLoading(false));
    }
  },
);

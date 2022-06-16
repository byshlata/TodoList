import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Api } from 'api/api';
import { ErrorArrayResponse, ResultCode } from 'enum';
import { changeStateLoading, setLogged } from 'state';
import { LoginParamsType } from 'type';

export const getAuthUser = createAsyncThunk(
  'authSlice/getAuthUser',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(changeStateLoading(true));
      const res = await Api.getAuthUser();

      if (res.resultCode === ResultCode.errorRequest) {
        return rejectWithValue(res.messages[ErrorArrayResponse.firstElement]);
      }
      dispatch(changeStateLoading(false));
      dispatch(setLogged(false));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.message);
      }
    } finally {
      dispatch(changeStateLoading(false));
    }
  },
);

export const authUser = createAsyncThunk(
  'authSlice/authUser',
  // eslint-disable-next-line consistent-return
  async (payload: LoginParamsType, { rejectWithValue, dispatch }) => {
    try {
      dispatch(changeStateLoading(true));
      const res = await Api.authUser(payload);

      if (res.resultCode === ResultCode.errorRequest) {
        return rejectWithValue(res.messages[ErrorArrayResponse.firstElement]);
      }
      dispatch(changeStateLoading(false));
      dispatch(setLogged(false));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.message);
      }
    } finally {
      dispatch(changeStateLoading(false));
    }
  },
);

export const userOut = createAsyncThunk(
  'authSlice/userOut',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(changeStateLoading(true));
      const res = await Api.authOff();

      if (res.resultCode === ResultCode.errorRequest) {
        return rejectWithValue(res.messages[ErrorArrayResponse.firstElement]);
      }
      dispatch(changeStateLoading(false));
      dispatch(setLogged(true));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.message);
      }
    } finally {
      dispatch(changeStateLoading(false));
    }
  },
);

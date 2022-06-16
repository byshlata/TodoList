import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthType } from '../../type/authType';

const initialState: AuthType = {
  isLoadingUser: false,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setLogged: (state, action: PayloadAction<boolean>) => {
      state.isLoadingUser = action.payload;
    },
  },
});

export const { setLogged } = authSlice.actions;

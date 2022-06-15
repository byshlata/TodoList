import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppType, LanguageType, StringNullType, ThemeType } from '../../type';

const initialState: AppType = {
  isLoading: false,
  errorMessage: null,
  theme: 'themeLight',
  todolistBackgroundColor: {},
  isDragDrop: false,
  language: 'EN',
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    changeStateLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setErrorMessage: (state, action: PayloadAction<StringNullType>) => {
      state.errorMessage = action.payload;
    },

    changeTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },

    changeDragDrop: (state, action: PayloadAction<boolean>) => {
      state.isDragDrop = action.payload;
    },

    changeLanguage: (state, action: PayloadAction<LanguageType>) => {
      state.language = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      action => action.type.endsWith('/rejected'),
      (state, action) => {
        state.errorMessage = action.payload as string;
      },
    );
  },
});

export const {
  setErrorMessage,
  changeStateLoading,
  changeTheme,
  changeDragDrop,
  changeLanguage,
} = appSlice.actions;

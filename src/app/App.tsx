import React, { ReactElement, useEffect } from 'react';

import { Container, ThemeProvider } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import s from './App.module.sass';

import {
  DarkThemeBackground,
  ErrorSnackbar,
  LightThemeBackground,
  PrimarySearchAppBar,
  Progress,
  Login,
  Page404,
  TodoListBlock,
} from 'component';
import { useAppDispatch } from 'hooks';
import { isLoadingElement, theme, getAuthUser, isInitialized } from 'state';
import { themeDark, themeLight } from 'utils';

export const App = (): ReactElement => {
  const dispatch = useAppDispatch();

  const isLoading = useSelector(isLoadingElement);
  const selectedTheme = useSelector(theme);
  const circle = useSelector(isInitialized);

  useEffect(() => {
    dispatch(getAuthUser());
  }, []);

  if (!circle) {
    return (
      <div className={s.circle}>
        <CircularProgress />
      </div>
    );
  }

  const themeNow = selectedTheme === 'themeLight' ? themeLight : themeDark;
  const backgroundTheme =
    selectedTheme === 'themeLight' ? <LightThemeBackground /> : <DarkThemeBackground />;

  return (
    <ThemeProvider theme={themeNow}>
      <ErrorSnackbar />

      {backgroundTheme}

      <PrimarySearchAppBar />
      <Progress isLoading={isLoading} />
      <Container fixed>
        <Routes>
          <Route path="/TodoList" element={<TodoListBlock />} />
          <Route path="/login" element={<Login />} />

          <Route path="/404" element={<Page404 />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

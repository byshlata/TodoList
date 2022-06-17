import React, { ReactElement, useEffect } from 'react';

import { Container, ThemeProvider } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

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
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
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

      <Container fixed>
        <Routes>
          <Route path="/TodoList" element={<TodoListBlock />} />
          <Route path="/login" element={<Login />} />

          <Route path="/404" element={<Page404 />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Container>

      <Progress isLoading={isLoading} />
    </ThemeProvider>
  );
};

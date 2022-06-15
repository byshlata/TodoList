import React, { useEffect, useRef } from 'react';

import { Container, ThemeProvider } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

import s from './App.module.sass';

import {
  Progress,
  LightThemeBackground,
  DarkThemeBackground,
  ErrorSnackbar,
  PrimarySearchAppBar,
  InputWithButton,
  TodoList,
} from 'component';
import { useAppDispatch } from 'hooks';
import {
  isDragDrop,
  isLoadingElement,
  theme,
  todoList,
  createTodoList,
  getTodoList,
} from 'state';
import { themeDark, themeLight } from 'utils';

export const App = (): React.ReactElement => {
  const dispatch = useAppDispatch();

  const constraintsRef = useRef(null);

  const todoLists = useSelector(todoList);
  const isLoading = useSelector(isLoadingElement);
  const selectedTheme = useSelector(theme);
  const isDragDropValue = useSelector(isDragDrop);

  useEffect(() => {
    dispatch(getTodoList());
  }, []);

  const themeNow = selectedTheme === 'themeLight' ? themeLight : themeDark;
  const backgroundTheme =
    selectedTheme === 'themeLight' ? <LightThemeBackground /> : <DarkThemeBackground />;

  const dragDropElement = (
    <motion.div className={s.appTodoListWrapper} ref={constraintsRef}>
      {todoLists.map(m => (
        <motion.div key={m.id} className="item" drag dragConstraints={constraintsRef}>
          <TodoList todoList={m} />
        </motion.div>
      ))}
    </motion.div>
  );

  const ordinaryElement = (
    <div className={s.appTodoListWrapper} ref={constraintsRef}>
      {todoLists.map(m => (
        <div key={m.id} className="item">
          <TodoList todoList={m} />
        </div>
      ))}
    </div>
  );

  const addTodoList = (title: string): void => {
    dispatch(createTodoList(title));
  };

  return (
    <ThemeProvider theme={themeNow}>
      <ErrorSnackbar />

      {backgroundTheme}

      <PrimarySearchAppBar />

      <Progress isLoading={isLoading} />

      <Container>
        <section className={s.appGridContainer}>
          <div className={s.appInputWrapper}>
            <InputWithButton add={addTodoList} />
          </div>
          {isDragDropValue ? dragDropElement : ordinaryElement}
        </section>
      </Container>
    </ThemeProvider>
  );
};

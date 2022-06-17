import React, { ReactElement, useEffect, useRef } from 'react';

import { Container } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import s from 'app/App.module.sass';
import { TodoList, InputWithButton } from 'component';
import { useAppDispatch } from 'hooks';
import { createTodoList, getTodoList, isDragDrop, isLoadingUser, todoList } from 'state';

export const TodoListBlock = (): ReactElement => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector(isLoadingUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getTodoList());
    } else {
      navigate('/login');
    }
  }, [isLoggedIn]);

  const constraintsRef = useRef(null);
  const todoLists = useSelector(todoList);
  const isDragDropValue = useSelector(isDragDrop);

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
    <Container>
      <section className={s.appGridContainer}>
        <div className={s.appInputWrapper}>
          <InputWithButton add={addTodoList} />
        </div>
        {isDragDropValue ? dragDropElement : ordinaryElement}
      </section>
    </Container>
  );
};

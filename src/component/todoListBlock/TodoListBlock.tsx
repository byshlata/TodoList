import React, { ReactElement, useEffect, useRef } from 'react';

import { Container } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

import s from 'app/App.module.sass';
import { InputWithButton } from 'component/inputWithButton/InputWithButton';
import { TodoList } from 'component/todoList/TodoList';
import { useAppDispatch } from 'hooks';
import { createTodoList, getTodoList, isDragDrop, todoList } from 'state';

export const TodoListBlock = (): ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodoList());
  }, []);

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

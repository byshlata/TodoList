import React, { ReactElement, useEffect, useState } from 'react';

import Pagination from '@material-ui/lab/Pagination/Pagination';

import s from './TodoList.module.sass';

import {
  ColorPalette,
  InputWithButton,
  SelectFilterBlock,
  Task,
  TitleTaskWithButton,
} from 'component';
import { ColorTodolist, FilterStatus, PaginationStyle, TaskStatuses } from 'enum';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import {
  changeTodoListFilter,
  createTask,
  deleteTodoList,
  getTasks,
  updateTodoListTitle,
} from 'state';
import { FilterValuesType, TaskType, TodoListType } from 'type';
import { calculatePagePagination, elementPagination, filterTasks } from 'utils';

type TodoListPropsType = {
  todoList: TodoListType;
};

export const TodoList = ({ todoList }: TodoListPropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector<TaskType[]>(state => state.tasks[todoList.id]);

  let todoListStyle = s.main;
  let tasksTodoList = tasks;
  let numberTaskCategory = todoList.amountTasks;

  const [pagePagination, setPagePagination] = useState<number>(
    PaginationStyle.startIndex,
  );

  useEffect(() => {
    dispatch(getTasks(todoList.id));
  }, []);

  const changeFilter = (filter: FilterValuesType): void => {
    dispatch(changeTodoListFilter({ idTodoList: todoList.id, filter }));
  };

  const removeTodolist = (): void => {
    dispatch(deleteTodoList(todoList.id));
  };

  const changeTitleTodoList = (title: string): void => {
    dispatch(updateTodoListTitle({ idTodoList: todoList.id, title }));
  };

  const createTaskHandle = (title: string): void => {
    dispatch(createTask({ idTodoList: todoList.id, title }));
  };

  if (todoList.filter === FilterStatus.active) {
    tasksTodoList = filterTasks(tasks, TaskStatuses.NEW);
    numberTaskCategory = tasksTodoList.length;
  }

  if (todoList.filter === FilterStatus.completed) {
    tasksTodoList = filterTasks(tasks, TaskStatuses.COMPLETED);
    numberTaskCategory = tasksTodoList.length;
  }

  if (tasksTodoList.length > PaginationStyle.amountElement) {
    tasksTodoList = elementPagination(tasksTodoList, pagePagination);
  }

  const onChangePagination = (event: object, page: number): void => {
    setPagePagination(page);
  };

  const numberPagePagination = calculatePagePagination(
    todoList.amountTasks,
    PaginationStyle.amountElement,
  );

  if (todoList.backgroundColor === ColorTodolist.main) {
    todoListStyle = s.main;
  }
  if (todoList.backgroundColor === ColorTodolist.primary) {
    todoListStyle = s.primary;
  }
  if (todoList.backgroundColor === ColorTodolist.secondary) {
    todoListStyle = s.secondary;
  }
  if (todoList.backgroundColor === ColorTodolist.additional) {
    todoListStyle = s.additional;
  }
  if (todoList.backgroundColor === ColorTodolist.best) {
    todoListStyle = s.best;
  }

  return (
    <div className={todoListStyle}>
      <div className={s.titleTodoListWrapper}>
        <TitleTaskWithButton
          title={todoList.title}
          changeTitleTodoList={changeTitleTodoList}
          removeTodoList={removeTodolist}
        />
      </div>

      <div className={s.inputWrapper}>
        <InputWithButton add={createTaskHandle} />
      </div>

      <div className={s.tasksWrapper}>
        <Task IdTask={todoList.id} taskList={tasksTodoList} />
      </div>

      {numberTaskCategory > PaginationStyle.amountElement ? (
        <div className={s.paginationWrapper}>
          <Pagination count={numberPagePagination} onChange={onChangePagination} />
        </div>
      ) : null}

      <div className={s.buttonWrapper}>
        <SelectFilterBlock changeFilter={changeFilter} todoListFilter={todoList.filter} />
        <ColorPalette idTodoList={todoList.id} />
      </div>
    </div>
  );
};

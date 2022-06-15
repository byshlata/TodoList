import React, { ChangeEvent, ReactElement } from 'react';

import { Checkbox, Grid } from '@material-ui/core';

import s from './InputChecked.module.sass';

import { SpanChange } from 'component';
import { TaskStatuses } from 'enum';
import { useAppDispatch, usePayloadTaskUpdate } from 'hooks';
import { updateTask } from 'state';
import { TaskType } from 'type';

type InputCheckedType = {
  task: TaskType;
};

export const InputChecked = ({ task }: InputCheckedType): ReactElement => {
  const dispatch = useAppDispatch();

  const { data, setToUpdateTask } = usePayloadTaskUpdate({
    description: task.description,
    priority: task.priority,
    todoListId: task.todoListId,
    startDate: task.startDate,
    deadline: task.deadline,
    id: task.id,
    status: task.status,
    title: task.title,
  });

  const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>): void => {
    const status = e.currentTarget.checked ? TaskStatuses.COMPLETED : TaskStatuses.NEW;
    setToUpdateTask({ status });
    dispatch(updateTask({ ...data, status }));
  };

  const onChangeTitle = (title: string): void => {
    setToUpdateTask({ title });
    dispatch(updateTask({ ...data, title }));
  };

  return (
    <>
      <Grid>
        <Checkbox
          checked={task.status === TaskStatuses.COMPLETED}
          onChange={onChangeTaskStatus}
          inputProps={{ 'aria-label': 'primary checkbox' }}
          color="primary"
          onClick={event => event.stopPropagation()}
          onFocus={event => event.stopPropagation()}
        />
      </Grid>
      <Grid item className={s.title}>
        <SpanChange title={task.title} changeTitle={onChangeTitle} typeElement="span" />
      </Grid>
    </>
  );
};

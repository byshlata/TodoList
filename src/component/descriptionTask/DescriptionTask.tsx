import React, { ReactElement } from 'react';

import { SpanChange } from 'component/spanChange/SpanChange';
import { useAppDispatch, usePayloadTaskUpdate } from 'hooks';
import { updateTask } from 'state';
import { TaskType } from 'type';

type DescriptionTaskType = {
  task: TaskType;
};

export const DescriptionTask = ({ task }: DescriptionTaskType): ReactElement => {
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

  const onChangeDescription = (description: string): void => {
    setToUpdateTask({ description });
    dispatch(updateTask({ ...data, description }));
  };

  return (
    <SpanChange
      changeTitle={onChangeDescription}
      title={`${task.description}`}
      typeElement="span"
    />
  );
};

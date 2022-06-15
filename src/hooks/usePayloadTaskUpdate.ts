import { useState } from 'react';

import { TaskPriority, TaskStatuses } from 'enum';
import { UpdateTaskType } from 'type';

type DataToUpdateTaskType = {
  description?: string | null;
  title?: string;
  status?: TaskStatuses;
  priority?: TaskPriority;
  todoListId?: string;
  startDate?: string | null;
  deadline?: string | null;
  id?: string;
};

export function usePayloadTaskUpdate(dataToUpdateTask: UpdateTaskType): {
  data: UpdateTaskType;
  setToUpdateTask: Function;
} {
  const [data, setData] = useState<UpdateTaskType>(dataToUpdateTask);

  const setToUpdateTask = (dataUpdate: DataToUpdateTaskType): void => {
    setData({ ...data, ...dataUpdate });
  };

  return { data, setToUpdateTask };
}

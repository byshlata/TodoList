import { AxiosResponse } from 'axios';

import { API_CONFIG } from 'api/config';
import { PathApi } from 'enum';
import {
  GetTasksResponseType,
  ResponseEveryType,
  TaskType,
  TodolistCreateType,
  TodolistResponseType,
  UpdateTaskType,
} from 'type';

export const Api = {
  getTodolists: async () => {
    const res = await API_CONFIG.get<TodolistResponseType[]>(`${PathApi.todoList}`);
    return res.data;
  },
  createTodolist: async (title: string) => {
    const res = await API_CONFIG.post<
      any,
      AxiosResponse<ResponseEveryType<TodolistCreateType>>,
      { title: string }
    >(`${PathApi.todoList}`, { title });
    return res.data;
  },

  deleteTodoList: async (idTodolist: string) => {
    const res = await API_CONFIG.delete<ResponseEveryType>(
      `${PathApi.todoList}/${idTodolist}`,
    );
    return res.data;
  },

  updateTodolistTitle: async (idTodolist: string, title: string) => {
    const res = await API_CONFIG.put<ResponseEveryType>(
      `${PathApi.todoList}/${idTodolist}`,
      {
        title,
      },
    );
    return res.data;
  },
  getTasks: async (idTodolist: string) => {
    const res = await API_CONFIG.get<GetTasksResponseType>(
      `${PathApi.todoList}/${idTodolist}/${PathApi.task}`,
    );
    return res.data;
  },
  createTask: async (idTodolist: string, title: string) => {
    const res = await API_CONFIG.post<ResponseEveryType<{ item: TaskType }>>(
      `${PathApi.todoList}/${idTodolist}/${PathApi.task}`,
      { title },
    );
    return res.data;
  },
  deleteTask: async (idTodolist: string, idTask: string) => {
    const res = await API_CONFIG.delete<ResponseEveryType>(
      `${PathApi.todoList}/${idTodolist}/${PathApi.task}/${idTask}`,
    );
    return res.data;
  },
  updateTask: async (payload: UpdateTaskType) => {
    const { title, description, status, priority, startDate, deadline, id, todoListId } =
      payload;
    const body = { title, description, status, priority, startDate, deadline };

    return API_CONFIG.put<ResponseEveryType<{ item: TaskType }>>(
      `${PathApi.todoList}/${todoListId}/${PathApi.task}/${id}`,
      { ...body },
    );
  },
};

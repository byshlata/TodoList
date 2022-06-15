import { store } from 'state/store';
import { GetTaskPayloadActionType } from 'type/tasksType';
import { TodoListType } from 'type/todoListType';
import { setTodoList } from 'state/slice/todoListSlice';
import { changeTask, removeTask, setTasks } from 'state/slice/tasksSlice';
import { TaskType } from 'type/apiType';

const { dispatch } = store;
const todoListIdOne = '1000';
const idTaskOneTodolistOne = '1001';
const idTaskTwoTodolistOne = '1002';

const todoListIdTwo = '2000';
const idTaskOneTodolistTwo = '2001';

const todoList: TodoListType[] = [
  {
    id: todoListIdOne,
    title: 'TitleTodoListOne',
    addedDate: '09-06-2022',
    order: 5,
    filter: 'all',
    amountTasks: 2,
    backgroundColor: 'main',
  },
  {
    id: todoListIdTwo,
    title: 'TitleTodoListTwo',
    addedDate: '09-06-2022',
    order: 4,
    filter: 'active',
    amountTasks: 1,
    backgroundColor: 'best',
  },
];

const tasksTodoListOne: GetTaskPayloadActionType = {
  idTodoList: todoListIdOne,
  tasks: [
    {
      description: null,
      title: 'TitleOne',
      status: 0,
      priority: 0,
      todoListId: todoListIdOne,
      startDate: null,
      deadline: null,
      id: idTaskOneTodolistOne,
      addedDate: '10-06-2022',
      order: 1,
    },
    {
      description: null,
      title: 'TitleTwo',
      status: 0,
      priority: 0,
      todoListId: todoListIdOne,
      startDate: null,
      deadline: null,
      id: idTaskTwoTodolistOne,
      addedDate: '10-06-2022',
      order: 1,
    },
  ],
};
const tasksTodoListTwo: GetTaskPayloadActionType = {
  idTodoList: todoListIdTwo,
  tasks: [
    {
      description: null,
      title: 'TitleThree',
      status: 0,
      priority: 0,
      todoListId: todoListIdOne,
      startDate: null,
      deadline: null,
      id: idTaskOneTodolistTwo,
      addedDate: '10-06-2022',
      order: 1,
    },
  ],
};

const titleChange = 'TitleThree';

const taskUpdate: TaskType = {
  description: null,
  title: titleChange,
  status: 0,
  priority: 0,
  todoListId: todoListIdOne,
  startDate: null,
  deadline: null,
  id: idTaskOneTodolistTwo,
  addedDate: '10-06-2022',
  order: 1,
};

describe('TasksSlice', () => {
  beforeEach(() => {
    dispatch(setTodoList(todoList));

    dispatch(setTasks(tasksTodoListOne));
    dispatch(setTasks(tasksTodoListTwo));
  });

  test('task should be set', () => {
    expect(store.getState().todoList).toEqual(todoList);
    expect(store.getState().tasks[todoListIdOne]).toEqual(tasksTodoListOne.tasks);
    expect(store.getState().tasks[todoListIdTwo]).toEqual(tasksTodoListTwo.tasks);
  });

  test('task should be remove', () => {
    dispatch(removeTask({ idTask: idTaskOneTodolistOne, idTodoList: todoListIdOne }));
    expect(store.getState().tasks[todoListIdOne].length).toBe(1);

    dispatch(removeTask({ idTask: '3001', idTodoList: todoListIdOne }));
    expect(store.getState().tasks[todoListIdOne].length).toBe(1);
  });

  test('task should be change', () => {
    dispatch(changeTask(taskUpdate));

    expect(store.getState().tasks[todoListIdTwo][0].title).toBe(titleChange);
  });
});

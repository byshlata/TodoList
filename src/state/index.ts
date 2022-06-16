export { store } from './store';

export type { AppRootStore, AppDispatch } from './store';

export {
  theme,
  isLoadingElement,
  todoList,
  errorMessage,
  isDragDrop,
  languageNow,
  isLoadingUser,
} from './selectors';

export {
  createTodoList,
  deleteTodoList,
  updateTodoListTitle,
  getTodoList,
} from './thunk/todoListThunk';

export { createTask, deleteTask, updateTask, getTasks } from './thunk/taskThunk';

export {
  changeDragDrop,
  changeLanguage,
  changeStateLoading,
  changeTheme,
  setErrorMessage,
  appSlice,
} from './slice/appSlice';

export {
  addTask,
  changeTask,
  removeTask,
  setTasks,
  tasksSlice,
} from './slice/tasksSlice';

export {
  changeTodoListFilter,
  setTodoList,
  changeBackgroundColor,
  removeTodoList,
  addTodoList,
  changeTodoListTitle,
  todoListSlice,
} from './slice/todoListSlice';

export { setLogged, authSlice } from './slice/authSlice';

export { getAuthUser, userOut, authUser } from './thunk/authThunk';

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { AppDispatch, AppRootStore } from 'state';

export const useAppDispatch = (): Function => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppRootStore> = useSelector;

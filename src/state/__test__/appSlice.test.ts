import { changeStateLoading, changeTheme, setErrorMessage } from '../slice/appSlice';

import { store } from 'state/store';
import { StringNullType, ThemeType } from 'type/appType';

describe('AppSlice', () => {
  const { dispatch } = store;
  let isLoading = false;
  let errorMessage: StringNullType = '';
  let theme: ThemeType = 'themeLight';

  test('loading should be true', () => {
    expect(isLoading).toBeFalsy();

    dispatch(changeStateLoading(true));

    isLoading = store.getState().app.isLoading;
    expect(isLoading).toBeTruthy();

    dispatch(changeStateLoading(false));
    isLoading = store.getState().app.isLoading;

    expect(isLoading).toBeFalsy();
  });

  test('error massage should be defined or null', () => {
    expect(errorMessage).toBe('');

    const error: StringNullType = 'ERROR';

    dispatch(setErrorMessage(error));

    errorMessage = store.getState().app.errorMessage;
    expect(errorMessage).toBe(error);

    dispatch(setErrorMessage(null));
    errorMessage = store.getState().app.errorMessage;

    expect(errorMessage).toBeNull();
  });

  test('theme should be change', () => {
    expect(theme).toBe('themeLight');

    dispatch(changeTheme('themeDark'));

    theme = store.getState().app.theme;
    expect(theme).toBe('themeDark');

    dispatch(changeTheme('themeLight'));

    theme = store.getState().app.theme;
    expect(theme).toBe('themeLight');
  });
});

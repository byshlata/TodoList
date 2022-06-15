import React, { ReactElement, useState } from 'react';

import Button from '@material-ui/core/Button';
import AddBox from '@material-ui/icons/AddBox';
import { useSelector } from 'react-redux';

import s from './InputWithButton.module.sass';

import { Input } from 'component';
import { useAppDispatch } from 'hooks';
import { dictionaryInput } from 'language';
import { languageNow, setErrorMessage, isLoadingElement, theme } from 'state';
import { changeDictionary } from 'utils';

export type InputWithButtonType = {
  add: (newTaskTitle: string) => void;
};

export const InputWithButton = ({ add }: InputWithButtonType): ReactElement => {
  const dispatch = useAppDispatch();

  const selectedTheme = useSelector(theme);
  const isDisable = useSelector(isLoadingElement);
  const languageValue = useSelector(languageNow);

  const [newTitle, setNewTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const language = changeDictionary(dictionaryInput, languageValue);

  const onNewTaskTitleChangeHandler = (value: string): void => {
    setNewTitle(value);
  };

  const checkTitleHelper = (title: string): void => {
    if (title.trim() !== '') {
      add(title.trim());
      setNewTitle('');
      setError(false);
    } else {
      setError(true);
      dispatch(setErrorMessage(language.title));
    }
  };

  const onClickButtonHandler = (): void => {
    checkTitleHelper(newTitle);
  };

  const onKeyPressNowTaskTitleChangeHandler = (key: string): void => {
    setError(false);
    if (key === 'Enter') {
      checkTitleHelper(newTitle);
    }
  };

  const backgroundThemeElement =
    selectedTheme === 'themeLight' ? `${s.wrapperLightTheme}` : `${s.wrapperDarkTheme}`;

  return (
    <div className={backgroundThemeElement}>
      <Input
        onChange={onNewTaskTitleChangeHandler}
        onKeyPress={onKeyPressNowTaskTitleChangeHandler}
        value={newTitle}
        error={error}
        onBlur={setError}
        disable={isDisable}
      />

      <Button
        variant="outlined"
        onClick={onClickButtonHandler}
        size="small"
        disabled={isDisable}
      >
        <AddBox />
      </Button>
    </div>
  );
};

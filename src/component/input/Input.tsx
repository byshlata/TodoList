import React, { ChangeEvent, KeyboardEvent, ReactElement } from 'react';

import { TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { dictionaryInput } from 'language';
import { languageNow } from 'state';
import { changeDictionary } from 'utils';

type InputPropsType = {
  onChange: (value: string) => void;
  onKeyPress: (key: string) => void;
  value: string;
  error: boolean;
  onBlur: (value: boolean) => void;
  disable: boolean;
};

export const Input = ({
  onChange,
  onKeyPress,
  value,
  error,
  onBlur,
  disable,
}: InputPropsType): ReactElement => {
  const languageValue = useSelector(languageNow);

  const language = changeDictionary(dictionaryInput, languageValue);

  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e.currentTarget.value);
  };

  const onKeyPressHandle = (e: KeyboardEvent<HTMLInputElement>): void => {
    onKeyPress(e.key);
  };

  const onBlurHandel = (): void => {
    onBlur(false);
  };

  return (
    <TextField
      label={language.title}
      variant="outlined"
      onChange={onChangeHandle}
      onKeyPress={onKeyPressHandle}
      value={value}
      error={error}
      color="primary"
      size="small"
      onBlur={onBlurHandel}
      disabled={disable}
    />
  );
};

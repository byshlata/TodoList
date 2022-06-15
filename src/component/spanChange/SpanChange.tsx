import React, { ChangeEvent, ReactElement, useState } from 'react';

import { TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';

import s from './SpanChange.module.sass';

import { isLoadingElement } from 'state';

type ElementType = 'h3' | 'span';

export type SpanChangeType = {
  title: string;
  changeTitle: (value: string) => void;
  typeElement: ElementType;
};

export const SpanChange = ({
  changeTitle,
  title,
  typeElement,
}: SpanChangeType): ReactElement => {
  const isDisable = useSelector(isLoadingElement);

  const [renameTitle, setChangeTitle] = useState<boolean>(false);
  const [newTitle, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const onNewTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setError(false);
    setTitle(e.currentTarget.value);
  };

  const activateEditMode = (): void => {
    setChangeTitle(true);
    setTitle(title);
  };

  const activateViewMode = (): void => {
    if (newTitle.trim() !== '') {
      setError(false);
      changeTitle(newTitle);
      setChangeTitle(false);
    } else {
      setError(true);
    }
  };

  const spanElement = (
    <span
      role="button"
      tabIndex={0}
      onKeyPress={activateEditMode}
      className={s.spanWrapper}
      onDoubleClick={activateEditMode}
      onClick={event => event.stopPropagation()}
      onFocus={event => event.stopPropagation()}
    >
      {title}
    </span>
  );

  const titleElement = (
    <b
      role="button"
      tabIndex={0}
      onKeyPress={activateEditMode}
      className={s.spanWrapper}
      onDoubleClick={activateEditMode}
      onClick={event => event.stopPropagation()}
      onFocus={event => event.stopPropagation()}
    >
      {title}
    </b>
  );

  const element = typeElement === 'h3' ? titleElement : spanElement;

  return renameTitle ? (
    <TextField
      onChange={onNewTaskTitleChangeHandler}
      onBlur={activateViewMode}
      value={newTitle}
      autoFocus
      error={error}
      onClick={event => event.stopPropagation()}
      onFocus={event => event.stopPropagation()}
      disabled={isDisable}
    />
  ) : (
    <> {element} </>
  );
};

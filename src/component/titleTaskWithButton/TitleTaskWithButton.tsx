import React, { ReactElement } from 'react';

import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector } from 'react-redux';

import s from './TitleTaskWithButton.module.sass';

import { SpanChange } from 'component';
import { dictionaryTitleTaskWithButton } from 'language';
import { isLoadingElement, languageNow } from 'state';
import { changeDictionary } from 'utils';

type TitleTaskWithButtonPropsType = {
  title: string;
  changeTitleTodoList: (title: string) => void;
  removeTodoList: () => void;
};

export const TitleTaskWithButton = ({
  changeTitleTodoList,
  title,
  removeTodoList,
}: TitleTaskWithButtonPropsType): ReactElement => {
  const isDisable = useSelector(isLoadingElement);
  const languageValue = useSelector(languageNow);

  const language = changeDictionary(dictionaryTitleTaskWithButton, languageValue);

  return (
    <div className={s.wrapper}>
      <SpanChange title={title} changeTitle={changeTitleTodoList} typeElement="h3" />

      <IconButton aria-label="delete" onClick={removeTodoList} disabled={isDisable}>
        <Tooltip title={language.titleHelp} placement="top">
          <DeleteIcon />
        </Tooltip>
      </IconButton>
    </div>
  );
};

import React, { ReactElement } from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForever from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';

import s from './Task.module.sass';

import { InputChecked, DescriptionTask } from 'component';
import { useAppDispatch } from 'hooks';
import { dictionaryTaskTodoList } from 'language';
import { deleteTask, isLoadingElement, languageNow } from 'state';
import { TaskType } from 'type';
import { changeDictionary } from 'utils';

type TaskPropsType = {
  IdTask: string;
  taskList: TaskType[];
};

const taskBackgroundColor = 'rgba(245,125,10,0.7)';

export const Task = ({ taskList, IdTask }: TaskPropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const isDisable = useSelector(isLoadingElement);
  const languageValue = useSelector(languageNow);

  const language = changeDictionary(dictionaryTaskTodoList, languageValue);

  const removeTaskHandel = (idTodoList: string, idTask: string): void => {
    dispatch(deleteTask({ idTask, idTodoList }));
  };

  return (
    <>
      {taskList.map(task => (
        <Accordion key={task.id}>
          <AccordionSummary
            style={{ backgroundColor: `${taskBackgroundColor}` }}
            expandIcon={<ExpandMoreIcon />}
            disabled={isDisable}
          >
            <Grid container className={s.wrapperTasksList}>
              <InputChecked task={task} />
              <Grid item>
                <Tooltip title={language.titleHelp} placement="right">
                  <IconButton
                    size="small"
                    onClick={event => {
                      removeTaskHandel(IdTask, task.id);
                      event.stopPropagation();
                    }}
                  >
                    <DeleteForever />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </AccordionSummary>

          <AccordionDetails>
            <DescriptionTask task={task} />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

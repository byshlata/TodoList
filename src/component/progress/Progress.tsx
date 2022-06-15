import React, { ReactElement } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';

import s from './Progress.module.sass';

type ProgressType = {
  isLoading: boolean;
};

export const Progress: React.FC<ProgressType> = ({
  isLoading,
}: ProgressType): ReactElement => (
  <div className={s.progressWrapper}>
    {isLoading && <LinearProgress className={s.progressItem} color="primary" />}
  </div>
);

import React, { ReactElement } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'hooks';
import { errorMessage, setErrorMessage } from 'state';

const DELAY_TIME_SNACKBAR = 3000;

const Alert = (props: AlertProps): React.ReactElement => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiAlert elevation={6} variant="filled" {...props} />
);

export const ErrorSnackbar = (): ReactElement => {
  const dispatch = useAppDispatch();
  const error = useSelector(errorMessage);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setErrorMessage(null));
  };

  const isOpen = error !== null;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={isOpen}
      autoHideDuration={DELAY_TIME_SNACKBAR}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
};

import React, { ReactElement, useState } from 'react';

import { Grid } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export const SwitchLabels = <T, D>(
  dispatch: Function,
  callbackAC: Function,
  value: T,
  valueTrusty: T,
  valueFalsy: T,
  iconTruth: D,
  iconFalsy: D,
): ReactElement => {
  const isChanged = value === valueTrusty;

  const [isTrusty, setState] = useState<boolean>(isChanged);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      dispatch(callbackAC(valueTrusty));
    } else {
      dispatch(callbackAC(valueFalsy));
    }
    setState(event.target.checked);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ margin: '0 10px 0 10px' }}
    >
      <>
        <FormControlLabel
          control={
            <Switch
              checked={isTrusty}
              onChange={handleChange}
              name="checkedA"
              color="secondary"
            />
          }
          label=""
        />
        {isTrusty ? iconTruth : iconFalsy}
      </>
    </Grid>
  );
};

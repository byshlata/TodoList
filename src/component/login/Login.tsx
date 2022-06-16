import React, { ReactElement } from 'react';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useAppDispatch } from 'hooks';
import { isLoadingUser } from 'state';
import { authUser } from 'state/thunk/authThunk';

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export const Login = (): ReactElement => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(isLoadingUser);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Password must be';
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      } else if (values.password.length < 3) {
        errors.password = 'Password must be at least 3 characters';
      }
      return errors;
    },
    onSubmit: values => {
      dispatch(authUser(values));
      formik.resetForm({ values: { email: '', password: '', rememberMe: false } });
    },
  });

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item justifyContent="center">
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href="https://social-network.samuraijs.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {' '}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...formik.getFieldProps('email')}
              />
              {formik.errors.email && formik.touched.email && (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              )}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...formik.getFieldProps('password')}
              />
              {formik.errors.password && formik.touched.password && (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                label="Remember me"
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                control={<Checkbox {...formik.getFieldProps('rememberMe')} />}
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};

// checked={formik.values.rememberMe}

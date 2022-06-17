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

import { RuleFormik, TestData } from 'enum';
import { useAppDispatch } from 'hooks';
import { dictionaryLogin } from 'language';
import { authUser, isLoadingUser, languageNow } from 'state';
import { changeDictionary } from 'utils';

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export const Login = (): ReactElement => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(isLoadingUser);
  const languageValue = useSelector(languageNow);
  const language = changeDictionary(dictionaryLogin, languageValue);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = language.error.emailErrorMustBe;
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = language.error.emailErrorData;
      }
      if (!values.password) {
        errors.password = language.error.passwordErrorMustBe;
      } else if (values.password.length < RuleFormik.minLinePassword) {
        errors.password = language.error.passwordErrorLength;
      }
      return errors;
    },
    onSubmit: values => {
      dispatch(authUser(values));
      formik.resetForm({ values: { email: '', password: '', rememberMe: false } });
    },
  });

  if (isLoggedIn) {
    return <Navigate to="/TodoList" />;
  }

  return (
    <Grid container justifyContent="center" style={{ margin: '0 auto' }}>
      <Grid item style={{ width: '300px' }}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p style={{ height: '50px' }}>{language.description.firstLine}</p>
              <p>
                {language.description.emailStr} <b>{TestData.email}</b>
              </p>
              <p>
                {language.description.passwordStr} <b>{TestData.password}</b>
              </p>
            </FormLabel>
            <FormGroup>
              <TextField
                label={language.description.emailStr}
                margin="normal"
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...formik.getFieldProps('email')}
              />
              {formik.errors.email && formik.touched.email && (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              )}
              <TextField
                type="password"
                label={language.description.passwordStr}
                margin="normal"
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...formik.getFieldProps('password')}
              />
              {formik.errors.password && formik.touched.password && (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                label={language.description.checkBox}
                style={{ color: 'white' }}
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                control={<Checkbox {...formik.getFieldProps('rememberMe')} />}
              />
              <Button type="submit" variant="contained" color="primary">
                {language.description.buttonName}
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};

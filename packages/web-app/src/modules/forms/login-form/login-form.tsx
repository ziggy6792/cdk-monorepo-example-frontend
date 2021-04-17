import React, { useState } from 'react';

import { Auth } from 'aws-amplify';
import Logger from 'js-logger';
import { Formik, Field, FieldAttributes } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, Grid } from '@material-ui/core';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { USER_TYPE } from 'src/domain/auth/user';
import { loginActionCreator } from 'src/domain/auth';

import envConfig from 'src/config/env-config';
import styles from './login-form.module.css';

interface IFormState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmationCode: string;
}

const loadDefaultData = envConfig.isDev || envConfig.isStaging;

const initialFormValues = loadDefaultData
  ? {
      email: 'ziggy067+1@gmail.com',
      firstName: 'Simon',
      lastName: 'Verhoeven',
      password: 'password',
      confirmationCode: '',
    }
  : {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmationCode: '',
    };

const signInSchema = {
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .required('Required'),
};

const signUpSchema = {
  ...signInSchema,
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
};

const confirmSchema = {
  confirmationCode: Yup.string()
    .length(6, 'Must Be 6 Characters!')
    .required('Required'),
};

// eslint-disable-next-line camelcase
async function signUp({ email, password, firstName, lastName }: IFormState) {
  try {
    const response = await Auth.signUp({
      username: email,
      password,
      attributes: { email, 'custom:signUpAttributes': JSON.stringify({ given_name: firstName, family_name: lastName }) },
    });
    Logger.info(response.user);
    Logger.info('sign up success!');
  } catch (err) {
    Logger.info('error signing up..', err);
  }
}

interface ISignupConfirmation {
  email: string;
  confirmationCode: string;
}

async function confirmSignUp({ email, confirmationCode }: ISignupConfirmation) {
  try {
    Logger.info('confirm', { email, confirmationCode });

    await Auth.confirmSignUp(email, confirmationCode);
    Logger.info('confirm sign up success!');
  } catch (err) {
    Logger.info('error signing up..', err);
  }
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <MainForm
      onSignUp={async (values: IFormState) => {
        signUp(values);
      }}
      onSignIn={async ({ email, password }: IFormState) => {
        dispatch(loginActionCreator({ type: USER_TYPE.EMAIL, email, password }));
      }}
      onConfirm={async ({ email, confirmationCode }: IFormState) => confirmSignUp({ email, confirmationCode })}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LoginFormField: React.FC<FieldAttributes<any>> = ({ ...props }) => (
  <Field
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    classes={{ root: styles.textField }}
    inputProps={{ style: { textAlign: 'center' } }}
    FormHelperTextProps={{
      classes: { root: styles.helperText },
    }}
  />
);

type SubmitFormFunction = (formValues: IFormState) => Promise<void>;

enum FormType {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  CONFIRM = 'CONFIRM',
}

interface SubFormProps {
  setFormType: (formType: FormType) => void;
  submitForm: () => Promise<void>;
  isSubmitDisabled: boolean;
  resetForm?: () => void;
}

const SignInForm: React.FC<SubFormProps> = ({ setFormType, submitForm, isSubmitDisabled, resetForm }) => (
  <>
    <Grid item>
      <LoginFormField component={TextField} name='email' type='email' inputProps={{ min: 0, style: { textAlign: 'center' } }} placeholder='Email' />
    </Grid>
    <Grid item>
      <LoginFormField component={TextField} type='password' placeholder='Password' name='password' />
    </Grid>
    <>
      <Grid item>
        <Button variant='contained' color='primary' disabled={isSubmitDisabled} onClick={submitForm}>
          Sign In
        </Button>
      </Grid>
      <Grid item>
        Need a Pofile?{' '}
        <Button
          color='primary'
          onClick={() => {
            resetForm();

            setFormType(FormType.SIGN_UP);
          }}
        >
          Sign Up
        </Button>
      </Grid>
    </>
  </>
);

const SignUpForm: React.FC<SubFormProps> = ({ setFormType, submitForm, isSubmitDisabled, resetForm }) => (
  <>
    <Grid item>
      {/* <CenteredField component={TextField} name='email' type='email' placeholder='Email' /> */}
      <LoginFormField component={TextField} name='email' type='email' placeholder='Email' />
    </Grid>
    <Grid item>
      <LoginFormField component={TextField} type='password' name='password' placeholder='Password' />
    </Grid>
    <Grid item>
      <LoginFormField component={TextField} name='firstName' placeholder='First Name' />
    </Grid>
    <Grid item>
      <LoginFormField component={TextField} name='lastName' placeholder='Last Name' />
    </Grid>
    <>
      <Grid item>
        <Button variant='contained' color='primary' disabled={isSubmitDisabled} onClick={submitForm}>
          Sign Up
        </Button>
      </Grid>
      <Grid item>
        Have a Pofile?{' '}
        <Button
          color='primary'
          onClick={() => {
            resetForm();

            setFormType(FormType.SIGN_IN);
          }}
        >
          Sign In
        </Button>
      </Grid>
    </>
  </>
);

const ConfirimForm: React.FC<SubFormProps> = ({ submitForm, isSubmitDisabled }) => (
  <>
    <Grid item>
      <LoginFormField component={TextField} name='confirmationCode' placeholder='Confirmation Code' />
    </Grid>

    <>
      <Button variant='contained' color='primary' disabled={isSubmitDisabled} onClick={submitForm}>
        Confirm Sign Up
      </Button>
    </>
  </>
);
interface FormProps {
  onSignIn: SubmitFormFunction;
  onSignUp: SubmitFormFunction;
  onConfirm: SubmitFormFunction;
}

export const MainForm: React.FC<FormProps> = ({ onSignIn, onSignUp, onConfirm }) => {
  const [formType, setFormType] = useState<FormType>(FormType.SIGN_IN);

  let onSubmit: SubmitFormFunction;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let validationSchema: any = {};

  switch (formType) {
    case FormType.SIGN_IN:
      onSubmit = async (values: IFormState) => {
        await onSignIn(values);
      };
      validationSchema = signInSchema;
      break;
    case FormType.SIGN_UP:
      onSubmit = async (values: IFormState) => {
        await onSignUp(values);
        setFormType(FormType.CONFIRM);
      };
      validationSchema = signUpSchema;
      break;
    case FormType.CONFIRM:
      onSubmit = async (values: IFormState) => {
        await onConfirm(values);
        setFormType(FormType.SIGN_IN);
      };
      validationSchema = confirmSchema;
      break;
    default:
  }

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={Yup.object().shape(validationSchema)}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await onSubmit(values);

        setSubmitting(false);
      }}
    >
      {(props) => {
        const { submitForm, isSubmitting, isValid, resetForm, dirty } = props;

        const isSubmitDisabled = isSubmitting || !isValid || (!dirty && !loadDefaultData);
        return (
          <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
            {formType === FormType.SIGN_IN && (
              <SignInForm setFormType={setFormType} isSubmitDisabled={isSubmitDisabled} submitForm={submitForm} resetForm={resetForm} />
            )}
            {formType === FormType.SIGN_UP && (
              <SignUpForm setFormType={setFormType} isSubmitDisabled={isSubmitDisabled} submitForm={submitForm} resetForm={resetForm} />
            )}
            {formType === FormType.CONFIRM && <ConfirimForm setFormType={setFormType} isSubmitDisabled={isSubmitDisabled} submitForm={submitForm} />}
          </Grid>
        );
      }}
    </Formik>
  );
};

export default LoginForm;

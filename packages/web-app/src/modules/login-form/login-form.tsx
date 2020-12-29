import React, { useState } from 'react';

import { Auth } from 'aws-amplify';
import Logger from 'js-logger';
import { Formik, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, Grid } from '@material-ui/core';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginActionCreator } from 'src/domain/auth';

interface IFormState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmationCode: string;
}

const initialFormValues = {
  email: 'ziggy067+9@gmail.com',
  firstName: 'Simon',
  lastName: 'Verhoeven',
  password: 'password',
  confirmationCode: '',
};

const signInSchema = {
  firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
};

const signUpSchema = {
  ...signInSchema,
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
};

const confirmSchema = {
  confirmationCode: Yup.string().length(6, 'Must Be 6 Characters!').required('Required'),
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

async function signIn({ email, password }: IFormState) {
  try {
    const response = await Auth.signIn(email, password);
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
        dispatch(loginActionCreator({ type: 'email', email, password }));
      }}
      onConfirm={async ({ email, confirmationCode }: IFormState) => confirmSignUp({ email, confirmationCode })}
    />
  );
};

type SubmitFormFunction = (formValues: IFormState) => Promise<void>;

enum FormType {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  CONFIRM = 'CONFIRM',
}

interface SubFormProps {
  setFormType: (formType: FormType) => void;
  isSubmitting: boolean;
  submitForm: () => Promise<void>;
}

const SignInForm: React.FC<SubFormProps> = ({ setFormType, isSubmitting, submitForm }) => (
  <Grid item>
    <Grid item>
      <Field component={TextField} name='email' type='email' label='Email' />
    </Grid>
    <Grid item>
      <Field component={TextField} type='password' label='Password' name='password' />
    </Grid>
    <Grid item>
      <Grid item>
        <Button variant='contained' color='primary' disabled={isSubmitting} onClick={submitForm}>
          Sign In
        </Button>
      </Grid>
      <Grid item>
        Need a Pofile?{' '}
        <Button color='primary' onClick={() => setFormType(FormType.SIGN_UP)}>
          Sign Up
        </Button>
      </Grid>
    </Grid>
  </Grid>
);

const SignUpForm: React.FC<SubFormProps> = ({ setFormType, isSubmitting, submitForm }) => (
  <Grid item>
    <Grid item>
      <Field component={TextField} name='email' type='email' label='Email' />
    </Grid>
    <Grid item>
      <Field component={TextField} type='password' label='Password' name='password' />
    </Grid>
    <Grid item>
      <Field component={TextField} name='firstName' label='First Name' />
    </Grid>
    <Grid item>
      <Field component={TextField} name='lastName' label='Last Name' />
    </Grid>
    <Grid item>
      <Grid item>
        <Button variant='contained' color='primary' disabled={isSubmitting} onClick={submitForm}>
          Sign Up
        </Button>
      </Grid>
      <Grid item>
        Have a Pofile?{' '}
        <Button color='primary' onClick={() => setFormType(FormType.SIGN_IN)}>
          Sign In
        </Button>
      </Grid>
    </Grid>
  </Grid>
);

const ConfirimForm: React.FC<SubFormProps> = ({ isSubmitting, submitForm }) => (
  <Grid item>
    <Grid item>
      <Field component={TextField} name='confirmationCode' label='Confirmation Code' />
    </Grid>

    <Grid item>
      <Button variant='contained' color='primary' disabled={isSubmitting} onClick={submitForm}>
        Confirm Sign Up
      </Button>
    </Grid>
  </Grid>
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
        console.log('start');
        await onSubmit(values);
        console.log('end');

        setSubmitting(false);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Grid container direction='column'>
          {formType === FormType.SIGN_IN && <SignInForm setFormType={setFormType} isSubmitting={isSubmitting} submitForm={submitForm} />}
          {formType === FormType.SIGN_UP && <SignUpForm setFormType={setFormType} isSubmitting={isSubmitting} submitForm={submitForm} />}
          {formType === FormType.CONFIRM && <ConfirimForm setFormType={setFormType} isSubmitting={isSubmitting} submitForm={submitForm} />}
        </Grid>
      )}
    </Formik>
  );
};

export default LoginForm;

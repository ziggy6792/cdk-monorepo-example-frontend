/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Field, Formik, ErrorMessage } from 'formik';
import { Grid, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormButtons from 'src/components/ui/buttons/form-buttons';
import AceEditor from 'src/components/forms/ace-editor/ace-editor';
import jsYaml from 'js-yaml';
import FormLayout from 'src/modules/form-layout';

export interface IUserOption {
  id: string;
  fullName: string;
}

export interface IYmlFormValues {
  ymlString: string;
}

interface IYmlFormProps {
  onSubmit: (formValues: IYmlFormValues) => Promise<void>;
  onCancel: () => void;
  initialValues?: IYmlFormValues;
  allowSubmitPristine?: boolean;
  allowSubmitEmpty?: boolean;
  title: string;
  placeholder?: string;
}

const validate = (values: IYmlFormValues) => {
  if (!values.ymlString) {
    return { ymlString: 'Required' };
  }

  try {
    const parsedParams = { rounds: jsYaml.load(values.ymlString) };
  } catch (err) {
    // eslint-disable-next-line no-underscore-dangle
    return { ymlString: err.message };
  }

  return {};
};

const YmlForm: React.FC<IYmlFormProps> = ({ onSubmit, onCancel, initialValues, allowSubmitPristine, allowSubmitEmpty, title, placeholder }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Formik
      initialValues={initialValues}
      validate={!allowSubmitEmpty ? validate : undefined}
      onSubmit={async (values) => {
        await onSubmit(values);
      }}
    >
      {(props) => {
        const { isSubmitting, isValid, dirty } = props;
        return (
          <FormLayout
            title={title}
            buttons={<FormButtons isSubmitting={isSubmitting} dirty={dirty} isValid={isValid} onCancel={onCancel} allowSubmitPristine={allowSubmitPristine} />}
          >
            <Grid container direction='column'>
              <Grid container direction='column' alignItems='center' justify='center' spacing={2}>
                <Grid item>
                  <Field name='ymlString' component={AceEditor} autoFocus placeholder={placeholder} />
                </Grid>
                <Grid item>
                  <ErrorMessage name='ymlString' />
                </Grid>
              </Grid>
            </Grid>
          </FormLayout>
        );
      }}
    </Formik>
  </MuiPickersUtilsProvider>
);
export default YmlForm;

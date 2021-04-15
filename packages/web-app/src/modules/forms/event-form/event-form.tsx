import React from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { TextArea } from 'src/components/forms/formik-material-ui/formik-material-ui';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { CreateEventInput, UpdateEventInput } from 'src/generated-types';
import { addHours, startOfHour } from 'date-fns';
import FormButtons from 'src/components/ui/buttons/form-buttons';
import FormLayout from 'src/modules/form-layout';

interface IEventFormProps {
  onSubmit: (event: CreateEventInput | Omit<UpdateEventInput, 'id'>) => Promise<void>;
  onCancel: () => void;
  initialValues?: Omit<UpdateEventInput, 'id'>;
  title: string;
}

const EventForm: React.FC<IEventFormProps> = ({ onSubmit, onCancel, initialValues, title }) => {
  const minTime = startOfHour(addHours(new Date(), 1));
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        initialValues={initialValues || { name: '', startTime: minTime, description: '' }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
          startTime: Yup.date().min(minTime, 'Please pick a later date'),
        })}
        onSubmit={async (values) => {
          await onSubmit(values);
        }}
      >
        {(props) => {
          const { isSubmitting, isValid, dirty } = props;
          return (
            <FormLayout buttons={<FormButtons isSubmitting={isSubmitting} dirty={dirty} isValid={isValid} onCancel={onCancel} />} title={title}>
              <Grid container direction='column' alignItems='center' justify='center' spacing={2}>
                <Grid item>
                  <Field name='name' component={TextField} label='Name' autoFocus />
                </Grid>
                <Grid item>
                  <Field name='startTime' component={DateTimePicker} label='Start Time' minutesStep={15} minDate={minTime} />
                </Grid>
                <Grid item>
                  <Field name='description' component={TextArea} placeholder='Description' />
                </Grid>
              </Grid>
            </FormLayout>
          );
        }}
      </Formik>
    </MuiPickersUtilsProvider>
  );
};

export default EventForm;

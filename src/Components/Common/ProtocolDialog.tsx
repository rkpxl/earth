import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, TextareaAutosize, Typography, Button } from '@mui/material';
import { Formik as Formic, Form, Field, ErrorMessage } from 'formik';
import PopUp from './Dialog'

type FormValues = {
  name: string;
  department: string;
  title: string;
  description: string;
};

const initialValues: FormValues = {
  name: '',
  department: '',
  title: '',
  description: '',
};

const ProtocolPopUp = (props : any) : JSX.Element => {

  const validateForm = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.department) {
      errors.department = 'Required';
    }
    if (values.description.length > 512) {
      errors.description = 'Maximum 512 characters allowed';
    }
    return errors;
  };

  const handleSubmit = (values: FormValues, { setSubmitting }: any) => {
    // Handle form submission logic here
    console.log(values);
    setSubmitting(false);
  };



  return (
    <PopUp {...props} >
      <Formic initialValues={initialValues} validate={validateForm} onSubmit={handleSubmit}>
      <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field name="name">
                  {({ field } : any) => (
                    <TextField label="Creator Name" disabled fullWidth {...field} />
                  )}
                </Field>
                <ErrorMessage name="name" component="div" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name="department">
                  {({ field } : any) => (
                    <FormControl fullWidth>
                      <InputLabel>Department</InputLabel>
                      <Select {...field} label="Department">
                        <MenuItem value="">Select Department</MenuItem>
                        <MenuItem value="department1">Department 1</MenuItem>
                        <MenuItem value="department2">Department 2</MenuItem>
                        <MenuItem value="department3">Department 3</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Field>
                <ErrorMessage name="department" component="div" />
              </Grid>
              <Grid item xs={12}>
                <Field name="title">
                  {({ field } : any) => (
                    <TextField label="Protocol Title" fullWidth {...field} />
                  )}
                </Field>
                <ErrorMessage name="title" component="div" />
              </Grid>
              <Grid item xs={12}>
                <Field name="description">
                  {({ field } : any) => (
                    <TextField  inputProps={{ style: { height: '150px' } }} label="Description" fullWidth multiline {...field} />
                  )}
                </Field>
                <ErrorMessage name="description" component="div" />
              </Grid>
            </Grid>
          </Form>
      </Formic>
    </PopUp>
  )
}

export default ProtocolPopUp

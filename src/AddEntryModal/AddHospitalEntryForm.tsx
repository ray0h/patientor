import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form, ErrorMessage } from 'formik';

import { useStateValue } from '../state';
import { TextField, DiagnosisSelection } from './FormField';
import { Entry } from '../types';

interface Props {
  onSubmit: (values: Entry) => void;
  onCancel: () => void;
}

const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik 
      initialValues={{
        id: "",
        type: "Hospital",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors["date"] = requiredError;
        }
        if (!values.description) {
          errors["description"] = requiredError;
        }
        if (!values.specialist) {
          errors["specialist"] = requiredError;
        }
        if (values.type==="Hospital") {
          if (!values.discharge.date) {
            errors["discharge.date"] = requiredError;
          }
          if (!values.discharge.criteria) {
            errors["discharge.criteria"] = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <ErrorMessage name="date"/>
            <ErrorMessage name="discharge.date"/>
            <Field 
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field 
              label="Description"
              placeholder="Diagnosis description"
              name="description"
              component={TextField}
            />
             <Field 
              label="Specialist"
              placeholder="Dr / NP"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection 
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field 
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field 
              label="Discharge Criteria"
              placeholder="criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button 
                  type="submit"
                  color="green"
                  floated="right"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHospitalEntryForm;
import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';
import { DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';

export type HcEntryFormValues = Omit<HealthCheckEntry, "id">;
export type HosEntryFormValues = Omit<HospitalEntry, "id">;
export type OccHealEntryFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface HCProps {
    onSubmit: (values: HcEntryFormValues) => void;
    onCancel: () => void;
}

interface HospitalProps {
    onSubmit: (values: HosEntryFormValues) => void;
    onCancel: () => void;
}

interface OccupationalHealthcareProps {
    onSubmit: (values: OccHealEntryFormValues) => void;
    onCancel: () => void;
}

export const HealthCheckForm: React.FC<HCProps> = ({ onSubmit, onCancel }) => {
    const [{ diagnosislist }] = useStateValue();

    return(
        <Formik 
            initialValues={{
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [""],
                type: "HealthCheck",
                healthCheckRating: 0
            }}
            onSubmit={onSubmit}
            validate={
                values => {
                    const fieldRequiredError = "Field is required";
                    const errors: { [field: string]: string } = {};
                    if(!values.description) errors.description = fieldRequiredError;
                    if(!values.date) errors.date = fieldRequiredError;
                    if(!values.specialist) errors.specialist = fieldRequiredError;
                    if(!values.healthCheckRating) errors.healthCheckRating = fieldRequiredError;

                    return errors;
                }
            }
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return(
                    <Form className='form ui'>
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Description"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnosislist)}
                        />
                        <Field
                            label="Rating"
                            placeholder="Pick between 0-3"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
                        />
                        <Grid>
                            <Grid.Column floated='left' width={6}>
                                <Button type='button' onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={6}>
                                <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>
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

export const HospitalForm: React.FC<HospitalProps> = ({ onSubmit, onCancel }) => {
    const [{ diagnosislist }] = useStateValue();

    return(
        <Formik 
            initialValues={{
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [""],
                type: "Hospital",
                discharge: {
                    date: "",
                    criteria: ""
                }
            }}
            onSubmit={onSubmit}
            validate={
                values => {
                    const fieldRequiredError = "Field is required";
                    const errors: { [field: string]: string } = {};
                    if(!values.description) errors.description = fieldRequiredError;
                    if(!values.date) errors.date = fieldRequiredError;
                    if(!values.specialist) errors.specialist = fieldRequiredError;
                    if(!values.discharge.date) errors.dischargeDate = fieldRequiredError;
                    if(!values.discharge.criteria) errors.dischargeCriteria = fieldRequiredError;

                    return errors;
                }
            }
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return(
                    <Form className='form ui'>
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Description"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnosislist)}
                        />
                        <Field
                            label="Discharge Date"
                            placeholder="YYYY-MM-DD"
                            name="discharge.date"
                            component={TextField}
                        />
                        <Field
                            label="Discharge Criteria"
                            placeholder="Enter criteria here"
                            name="discharge.criteria"
                            component={TextField}
                        />
                        <Grid>
                            <Grid.Column floated='left' width={6}>
                                <Button type='button' onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={6}>
                                <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>
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

export const OccupationalHealthcareForm: React.FC<OccupationalHealthcareProps> = ({ onSubmit, onCancel }) => {
    const [{ diagnosislist }] = useStateValue();

    return(
        <Formik 
            initialValues={{
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [""],
                type: "OccupationalHealthcare",
                sickLeave: {
                    startDate: "",
                    endDate: ""
                },
                employerName: ""
            }}
            onSubmit={onSubmit}
            validate={
                values => {
                    const fieldRequiredError = "Field is required";
                    const errors: { [field: string]: string } = {};
                    if(!values.description) errors.description = fieldRequiredError;
                    if(!values.date) errors.date = fieldRequiredError;
                    if(!values.specialist) errors.specialist = fieldRequiredError;
                    if(!values.employerName) errors.employerName = fieldRequiredError;

                    return errors;
                }
            }
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return(
                    <Form className='form ui'>
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Description"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnosislist)}
                        />
                        <Field
                            label="Start Date"
                            placeholder="YYYY-MM-DD"
                            name="sickleave.startDate"
                            component={TextField}
                        />
                        <Field
                            label="End Date"
                            placeholder="YYYY-MM-DD"
                            name="sickleave.endDate"
                            component={TextField}
                        />
                        <Field
                            label="Employer Name"
                            placeholder="Enter Employer Name"
                            name="employerName"
                            component={TextField}
                        />
                        <Grid>
                            <Grid.Column floated='left' width={6}>
                                <Button type='button' onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={6}>
                                <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>
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
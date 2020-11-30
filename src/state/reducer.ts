import { State } from "./state";
import { Diagnosis, Patient } from "../types";

type patientListActionType = {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
};

type diagnosisListActionType = {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
};

export const setPatientList = (patientList: Patient[]): patientListActionType => {
    return { 
        type: "SET_PATIENT_LIST",
        payload: patientList
    };
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): diagnosisListActionType => {
    return {
        type: "SET_DIAGNOSIS_LIST",
        payload: diagnosisList
    };
};


export type Action =
    {
        type: "SET_PATIENT_LIST";
        payload: Patient[];
    }
  | {
        type: "ADD_PATIENT";
        payload: Patient;
    }
  | {
        type: "SET_PATIENT";
        payload: Patient;
  } 
  | {
        type: "SET_DIAGNOSIS_LIST";
        payload: Diagnosis[];
  };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case"SET_PATIENT":
      return {
          ...state,
          currentPatient: action.payload
      };
    case"SET_DIAGNOSIS_LIST":
        return {
            ...state,
            diagnosislist: {
                ...action.payload.reduce(
                    (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis}),
                    {}
                ),
                ...state.diagnosislist
            }
        };
    default:
        return state;
    }
};

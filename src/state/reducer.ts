import { State } from "./state";
import { Patient } from "../types";

type patientListActionType = {
    type: "SET_PATIENT_LIST";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: Patient[];
};

export const setPatientList = (patientList: Patient[]): patientListActionType => {
    return { 
        type: "SET_PATIENT_LIST", 
        payload: patientList
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
    default:
      return state;
  }
};

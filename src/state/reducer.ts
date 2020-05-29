import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient[];
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
  }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
  } 
  | {
      type: "ADD_ENTRY";
      payload: Entry[];
  };

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const addPatient = (newPatientList: Patient[]): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatientList
  };
};

export const setPatient = (thePatient: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: thePatient
  };
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisList
  };
};

export const addEntry = (newEntryList: Entry[]): Action => {
  return {
    type: "ADD_ENTRY",
    payload: newEntryList
  };
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
      console.log("adding patient", action.payload);
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          )},
        ...state.patients
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    case "SET_DIAGNOSIS_LIST": 
      return {
        ...state,
        diagnoses: { 
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }), {}
          )
        },
        ...state.diagnoses
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patient: {
          ...state.patient,
          entries: action.payload},
      };
    default:
      return state;
  }
};

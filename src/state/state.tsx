import React, { createContext, useContext, useReducer } from "react";
import { Diagnosis, Patient } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  diagnosislist: { [id: string]: Diagnosis | undefined };
  currentPatient: Patient | null;
};

type StateProviderProps = {
    reducer: React.Reducer<State, Action>;
    children: React.ReactElement;
};

const initialState: State = {
  patients: {},
  diagnosislist: {},
  currentPatient: null,
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

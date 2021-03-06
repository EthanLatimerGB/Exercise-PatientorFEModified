import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch, useParams } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { setPatientList, setDiagnosisList } from './state/reducer';
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientMoreInfo from "./components/PatientMoreInfo";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        const { data: requestedDiagnosis } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        dispatch(setDiagnosisList(requestedDiagnosis));
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);

  interface ParamsTypes {
      id: string | undefined;
  }

  const PatientMoreInfoPassing = () => {
      const { id } = useParams<ParamsTypes>();
      return(
        <PatientMoreInfo id={id}/>
      );
  };

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id">
                <PatientMoreInfoPassing/>
            </Route>
            <Route path="/">
                <PatientListPage/>
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;

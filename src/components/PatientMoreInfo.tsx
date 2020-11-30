import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from "../state";
import {  } from '../state/reducer';
import {  Entry } from '../types';

import Axios from 'axios';
import { Icon, Header } from 'semantic-ui-react';


interface MoreInfoProps {
    id: string | undefined;
}

interface PassingGenderProps {
    gender: string | undefined;
}

interface PassingEntryArray {
    entries: Array<Entry> | undefined;
}

interface PassingEntry {
    entry: Entry | undefined;
}

interface PassingSearchEntries {
    code: string | undefined;
}

const EntryIcon: React.FC<PassingEntry> = ({entry}) => {
    switch (entry?.type){
        case"HealthCheck":
            return <Icon name="stethoscope" size="small"/>;
        case"Hospital":
            return <Icon name="hospital outline" size="small"/>;
        case"OccupationalHealthcare":
            return <Icon name="user doctor" size='small'/>;
        default:
            return null;
    }
};

const GenderIcon: React.FC<PassingGenderProps> = (props) => {
    if(typeof props.gender === 'undefined') return null;
    if(props.gender === 'male'){
        return <Icon name="mars" size="small" />;
    }
    if(props.gender === 'female'){
        return <Icon name="venus" size="small" />;
    }
    if(props.gender){
        return <Icon name='other gender' size='small'/>;
    }
    return null;
};

const DisplayEntries: React.FC<PassingEntryArray> = ({ entries }) => {
    const [{ diagnosislist }] = useStateValue();
    if(typeof entries === 'undefined') return <Header size="large">No entries</Header>;
    if(typeof diagnosislist === "undefined") return null;

    const SearchDiagnosis: React.FC<PassingSearchEntries> = ({ code }) => {
        if(typeof code === 'undefined') return null;
        
        const codeDescription = Object.values(diagnosislist).find((diagnosis) => {
            if(typeof diagnosis === 'undefined') return null;
            if(diagnosis.code === code){
                return diagnosis;
            }
        });

        return <p>{codeDescription?.name}</p>;
    };

    const DisplayCodes: React.FC<PassingEntry> = ({ entry }) => {
        if(typeof entry === 'undefined') return null;
        if(typeof entry.diagnosisCodes === 'undefined') return null;
        return(
            <div>
                <p>Codes: </p>
                <ul>
                    {
                        //If there are dianosis codes, then they will be listed
                        entry.diagnosisCodes.map((code) => {
                            return <li key={code}>
                                    {code} <SearchDiagnosis code={code}/>
                            </li>;
                        })
                    }
                </ul>
            </div>
        );
    };

    return (
        <div>
            <h2>Entries</h2>
            {
                entries.map((entry: Entry) => {
                    return (
                        <div key={entry.id} className="ui segment">
                            <Header size='medium'>
                                {entry.date} <EntryIcon entry={entry}/>
                            </Header>
                            <p>{entry.description}</p>
                            <DisplayCodes entry={entry}/>
                        </div>
                    );
                })
            }
        </div>
    );
};

const PatientMoreInfo: React.FC<MoreInfoProps> = (props) => {
    const [{ currentPatient }, dispatch] = useStateValue();
    const id = props.id;

    useEffect(() => {
        const requestSinglePatient = async () => {
            try {
                if(currentPatient === null || currentPatient.id !== id){
                    if(typeof id ==='undefined') throw new Error('Id is undefined');
                    const { data: requestedPatient } = await Axios.get(`http://localhost:3001/api/patients/${id}`);
                    if(!requestedPatient) return <h2>Failed to obtain user data</h2>;
                    dispatch({ type: "SET_PATIENT", payload: requestedPatient });
                }
            }
            catch(error) {
                console.error(error);
            }
        };
    
        requestSinglePatient();
    }, []);

    return(
        <div>
            <div>
                <Link to={'/'}>Back</Link>
            </div>

            <div className="ui segment">
                <h2>{currentPatient?.name} <GenderIcon gender={currentPatient?.gender}/> </h2>
                <p>Occupation: {currentPatient?.occupation}</p>
                <p>Date of Birth: {currentPatient?.dateOfBirth}</p>

                <DisplayEntries entries={currentPatient?.entries}/>
            </div>
        </div>
    );
};

export default PatientMoreInfo;
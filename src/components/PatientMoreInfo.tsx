import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from "../state";
import { Entry } from '../types';

import Axios from 'axios';
import { Icon } from 'semantic-ui-react';


interface MoreInfoProps {
    id: string | undefined;
}

interface PassingGenderProps {
    gender: string | undefined;
}

interface PassingEntryArray {
    entries: Array<Entry> | undefined;
}

const GenderIcon: React.FC<PassingGenderProps> = (props) => {
    if(typeof props.gender === 'undefined') return null;
    if(props.gender === 'male'){
        return <div>
            <Icon name="mars" size="small" />
        </div>;
    }
    if(props.gender === 'female'){
        return <div>
            <Icon name="venus" size="small" />
        </div>;
    }
    if(props.gender){
        return <div>
            <Icon name='other gender' size='small'/>
        </div>;
    }
    return null;
};

const DisplayEntries: React.FC<PassingEntryArray> = ({ entries }) => {
    if(typeof entries === 'undefined') return null;
    return (
        <div>
            <h2>Entries</h2>
            {
                entries.map((entry: Entry) => {
                    return (
                        <div key={entry.id} style={{ backgroundColor: "lightgray"}}>
                            <p>Date: {entry.date}</p>
                            <p>Description: {entry.description}</p>
                            <p>Codes: </p>
                            <ul>
                                {
                                    typeof entry.diagnosisCodes === "undefined" ? null : entry.diagnosisCodes.map((code) => {
                                        return <li key={code}>{code}</li>;
                                    })
                                }
                            </ul>
                            
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
            <div>
                <h2>{currentPatient?.name} <GenderIcon gender={currentPatient?.gender}/> </h2>
                <p>Occupation: {currentPatient?.occupation}</p>
                <p>Date of Birth: {currentPatient?.dateOfBirth}</p>

                <DisplayEntries entries={currentPatient?.entries} />
            </div>
        </div>
    );
};

export default PatientMoreInfo;
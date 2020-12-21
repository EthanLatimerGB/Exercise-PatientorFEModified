import React from 'react';
import { Modal, Segment, Button } from 'semantic-ui-react';
import { Entry } from '../types';
import { HealthCheckForm, HospitalForm, OccupationalHealthcareForm } from './AddEntryForm';

export type EntryOmitted = Omit<Entry, 'id'>;

interface EntryProps {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryOmitted) => void;
    error?: string;
}

interface SwitcherProps {
    selectedEntry: string;
}

const AddEntryModal = ({modalOpen, onClose, onSubmit, error}: EntryProps) => {
    const [selectedEntry, setSelectedEntry] = React.useState<string>('');

    const DisplaySwitcher: React.FC<SwitcherProps> = ({ selectedEntry }) => {
        switch(selectedEntry){
            case"HealthCheck":
                return <HealthCheckForm onSubmit={onSubmit} onCancel={onClose} />;
            case"Hospital":
                return <HospitalForm onSubmit={onSubmit} onCancel={onClose} />;
            case"Occupational Healthcare":
                return <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onClose} />;
            default:
                return <p>Select your type of entry with the menu above</p>;
        }
    };

    return(
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
            <Modal.Header>Create a new Healtcheck Entry</Modal.Header>
            <Modal.Content>
                <Button onClick={() => setSelectedEntry('HealthCheck')}>Health Check</Button>
                <Button onClick={() => setSelectedEntry('Hospital')}>Hospital</Button>
                <Button onClick={() => setSelectedEntry('Occupational Healthcare')}>Occupational Healthcare</Button>
                {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
                <DisplaySwitcher selectedEntry={selectedEntry}/>
            </Modal.Content>
        </Modal>
    );
};

export default AddEntryModal;
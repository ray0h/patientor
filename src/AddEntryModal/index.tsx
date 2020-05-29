import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHealthCheckEntryForm from '../AddEntryModal/AddHealthCheckEntryForm';
import AddHospitalEntryForm from '../AddEntryModal/AddHospitalEntryForm';
import AddOHCEntryForm from '../AddEntryModal/AddOHCEntryForm';
import { EntryFormValues } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  name: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, name }: Props) => {
  console.log(name);
  if(name === "HealthCheck") {
    console.log("HC Modal");
    return (
      <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon> 
      <Modal.Header>Add a new HealthCheck entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">
          {`Error: ${error}`}</Segment>}
        <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} /> 
      </Modal.Content>
    </Modal>
    );
  } else if (name === "Hospital") {
    console.log("Hospital modal");
    return (
      <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon> 
      <Modal.Header>Add a new Hospital entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">
          {`Error: ${error}`}</Segment>}
        <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} /> 
      </Modal.Content>
    </Modal>
    );
  } else if (name === "Occupational Healthcare") {
    return (
      <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon> 
      <Modal.Header>Add a new Occupational Healthcare entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">
          {`Error: ${error}`}</Segment>}
        <AddOHCEntryForm onSubmit={onSubmit} onCancel={onClose} /> 
      </Modal.Content>
    </Modal>
    );
  } else {
    return <div/>;
  }
};

export default AddEntryModal;
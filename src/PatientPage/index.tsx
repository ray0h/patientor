import React from "react";
import axios from "axios";
import { Container, Icon, Button } from "semantic-ui-react";

import { Patient, Entry, EntryFormValues } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient, addEntry } from "../state";
import { useParams } from 'react-router-dom';
import EntryListPage from '../EntryListPage';
import AddEntryModal from "../AddEntryModal";

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [type, setType] = React.useState<string>("");
  const [modalOpen, setModalOpen] = React.useState< boolean >(false);
  const [error, setError] = React.useState< string |undefined >();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntryList } = await axios.post<Entry[]>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(addEntry(newEntryList));
      closeModal();
    } catch (error) {
      console.error(error.response.data);
      setError(error.response.data.error);
    }
  };

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [dispatch]);

  const male = <Icon name="mars"/>;
  const female = <Icon name="venus"/>;
  const other = <Icon name="genderless"/>;

  return (
    <div>
      <Container textAlign="left">
        <h2>{patient.name} {patient.gender === "male" ? male : patient.gender === "female" ? female : other}</h2>
        <div>
          DOB: {patient.dateOfBirth}<br/>
          SSN: {patient.ssn} <br/>
          Job: {patient.occupation}
        </div>
        
        <h3>Entries</h3>
        {patient.entries ? patient.entries.map((entry, ind) => <EntryListPage key={ind} entry={entry}/>) : null} 
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
          name={type}
        />
        <Button onClick={() => {
          setType("HealthCheck");
          openModal();
        }}>Add New HealthCheck Entry</Button>
        <Button onClick={() => {
          setType("Hospital");
          openModal();
        }}>Add New Hosptial Entry</Button>
        <Button onClick={() => {
          setType("Occupational Healthcare");
          openModal();
        }}>Add New Occupational Healthcare Entry</Button>
      </Container>
    </div>
  );
};

export default PatientPage;
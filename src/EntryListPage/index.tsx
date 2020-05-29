import React from 'react';
import HealthCheckComp from "../components/HealthCheckComp";
import HospitalComp from "../components/HospitalComp";
import OHC from "../components/OccupationalHealthcareComp";
import { Entry } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryListPage: React.FC<{entry: Entry}> = ({entry}) => {
  switch(entry.type) {
    case "HealthCheck":
      return <HealthCheckComp entry={entry}/>;
    case "Hospital":
      return <HospitalComp entry={entry}/>;
    case "OccupationalHealthcare":
      console.log(entry.employerName);
      return <OHC entry={entry} employer={entry.employerName}/>;
    default: assertNever(entry);
  }
  return null;
};

export default EntryListPage;
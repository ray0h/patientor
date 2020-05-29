import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Entry } from '../types';

const HealthCheckComp: React.FC<{entry: Entry}> = ({ entry }) => {
  const [{ diagnoses }, ] = useStateValue();
  const heartbeat = <Icon name="heartbeat"/>
  return (
    <div>
      <Segment >
  <h4><strong>{entry.date}</strong>  {heartbeat}</h4>
        {entry.description}
        <ul>{entry.diagnosisCodes ? entry.diagnosisCodes.map((code, ind) => 
          <li key={ind}>{code} {Object.values(diagnoses).find(d => d.code === code)?.name}</li>) : null}
        </ul>
      </Segment>
    </div>
  );
};

export default HealthCheckComp;
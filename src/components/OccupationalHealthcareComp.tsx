import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Entry } from '../types';

const OHC: React.FC<{entry: Entry; employer: string }> = ({ entry, employer }) => {
  const [{ diagnoses }, ] = useStateValue();
  const steth = <Icon name="stethoscope"/>;
  
  return (
    <div>
      <Segment >
        <h4><strong>{entry.date}</strong>  {steth}{employer}</h4>
        {entry.description}
        <ul>{entry.diagnosisCodes ? entry.diagnosisCodes.map((code, ind) => 
          <li key={ind}>{code} {Object.values(diagnoses).find(d => d.code === code)?.name}</li>) : null}
        </ul>
      </Segment>
    </div>
  );
};

export default OHC;
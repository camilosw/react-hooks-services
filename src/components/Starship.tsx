import * as React from 'react';
import useStarshipByIdService from '../services/useSingleStarshipService';

export interface Props {
  url: string;
}

const Starship: React.FC<Props> = ({ url }) => {
  const starship = useStarshipByIdService(url);

  return (
    <div>
      {starship.status === 'loading' && <div>Loading</div>}
      {starship.status === 'loaded' && (
        <div>
          <div>
            <strong>Name: </strong>
            {starship.payload.name}
          </div>
          <div>
            <strong>Crew: </strong>
            {starship.payload.crew}
          </div>
          <div>
            <strong>Passengers: </strong>
            {starship.payload.passengers}
          </div>
          <div>
            <strong>Price: </strong>
            {!!starship.payload.cost_in_credits &&
            parseInt(starship.payload.cost_in_credits) ? (
              <>
                {new Intl.NumberFormat('en-US').format(
                  parseInt(starship.payload.cost_in_credits)
                )}{' '}
                Credits
              </>
            ) : (
              <>Call us</>
            )}
          </div>
        </div>
      )}
      {starship.status === 'error' && <div>Error</div>}
    </div>
  );
};

export default Starship;

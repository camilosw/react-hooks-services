import * as React from 'react';
import useStarshipByIdService from '../services/useSingleStarshipService';
import Loader from './Loader';

export interface Props {
  url: string;
  onClose(): void;
}

const Starship: React.FC<Props> = ({ url, onClose }) => {
  const starship = useStarshipByIdService(url);

  return (
    <div className="starship-modal-container">
      <div className="starship-modal-background" onClick={onClose} />

      {starship.status === 'loading' && <Loader />}

      {starship.status === 'loaded' && (
        <div className="starship">
          <h2>{starship.payload.name}</h2>

          <div className="price">
            {!!starship.payload.cost_in_credits &&
            parseInt(starship.payload.cost_in_credits) ? (
              <>
                {new Intl.NumberFormat('en-US').format(
                  parseInt(starship.payload.cost_in_credits)
                )}{' '}
                Credits
              </>
            ) : (
              'Call us for price'
            )}
          </div>

          <div className="starship-info">
            <div className="starship-info-item">
              <div className="label">Crew</div>
              <div className="data">{starship.payload.crew}</div>
            </div>
            <div className="starship-info-item">
              <div className="label">Passengers</div>
              <div className="data">{starship.payload.passengers}</div>
            </div>
          </div>
        </div>
      )}

      {starship.status === 'error' && <div className="starship">Error</div>}
    </div>
  );
};

export default Starship;

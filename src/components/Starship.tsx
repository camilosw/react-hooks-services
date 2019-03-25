import React from 'react';
import useStarshipByUrlService from '../services/useStarshipByUrlService';
import Loader from './Loader';

export interface Props {
  url: string;
  onClose(): void;
}

const Starship: React.FC<Props> = ({ url, onClose }) => {
  const service = useStarshipByUrlService(url);

  return (
    <div className="starship-modal-container">
      <div className="starship-modal-background" onClick={onClose} />

      {service.status === 'loading' && <Loader />}

      {service.status === 'loaded' && (
        <div className="starship">
          <h2>{service.payload.name}</h2>

          <div className="price">
            {!!service.payload.cost_in_credits &&
            parseInt(service.payload.cost_in_credits) ? (
              <>
                {new Intl.NumberFormat('en-US').format(
                  parseInt(service.payload.cost_in_credits)
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
              <div className="data">{service.payload.crew}</div>
            </div>
            <div className="starship-info-item">
              <div className="label">Passengers</div>
              <div className="data">{service.payload.passengers}</div>
            </div>
          </div>
        </div>
      )}

      {service.status === 'error' && (
        <div className="starship">
          Error, something weird happened with the starship.
        </div>
      )}
    </div>
  );
};

export default Starship;

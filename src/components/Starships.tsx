import React from 'react';
import useStarshipsService from '../services/useStarshipsService';
import Loader from './Loader';
import Starship from './Starship';

const Starships: React.FC<{}> = () => {
  const service = useStarshipsService();
  const [url, setUrl] = React.useState('');

  return (
    <>
      <div className="card">
        {service.status === 'loading' && (
          <div className="loader-container">
            <Loader />
          </div>
        )}
        {service.status === 'loaded' &&
          service.payload.results.map(starship => (
            <div
              className="starship-item"
              onClick={() => setUrl(starship.url)}
              key={starship.url}
            >
              {starship.name}
            </div>
          ))}
        {!!url && <Starship url={url} onClose={() => setUrl('')} />}
      </div>
      {service.status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </>
  );
};

export default Starships;

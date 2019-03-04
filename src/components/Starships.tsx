import * as React from 'react';
import useStarshipsService from '../services/useStarshipsService';
import Loader from './Loader';
import Starship from './Starship';

const Starships: React.FC<{}> = () => {
  const starships = useStarshipsService();
  const [url, setUrl] = React.useState('');

  return (
    <>
      <div className="card">
        {starships.status === 'loading' && (
          <div className="loader-container">
            <Loader />
          </div>
        )}
        {starships.status === 'loaded' &&
          starships.payload.results.map((starship, index) => (
            <div
              className="starship-item"
              onClick={() => setUrl(starship.url)}
              key={index}
            >
              {starship.name}
            </div>
          ))}
        {!!url && <Starship url={url} onClose={() => setUrl('')} />}
      </div>
      {starships.status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </>
  );
};

export default Starships;

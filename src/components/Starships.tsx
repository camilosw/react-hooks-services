import * as React from 'react';
import useStarshipsService from '../services/useStarshipsService';
import Starship from './Starship';

const Starships: React.FC<{}> = () => {
  const starships = useStarshipsService();
  const [url, setUrl] = React.useState('');
  const [test, setTest] = React.useState(true);

  return (
    <div>
      {starships.status === 'loading' && <div>Loading...</div>}
      {starships.status === 'loaded' &&
        starships.payload.results.map((starship, index) => (
          <div onClick={() => setUrl(starship.url)} key={index}>
            {starship.name}
          </div>
        ))}
      {starships.status === 'error' && (
        <div>An error has ocurred, the backend moved to the dark side.</div>
      )}
      {!!url && <Starship url={url} />}
    </div>
  );
};

export default Starships;

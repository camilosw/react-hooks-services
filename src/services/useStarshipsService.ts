import { useEffect, useState } from 'react';
import { Service } from '../types/Service';
import { Starship } from '../types/Starship';

export interface Starships {
  results: Starship[];
}

const useStarshipsService = () => {
  const [result, setResult] = useState<Service<Starships>>({
    status: 'loading'
  });

  useEffect(() => {
    fetch('https://swapi.co/api/starships')
      .then(response => response.json())
      .then(response => setResult({ status: 'loaded', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, []);

  return result;
};

export default useStarshipsService;

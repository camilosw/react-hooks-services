import { useEffect, useState } from 'react';
import { Service } from '../types/Service';
import { Starship } from '../types/Starship';

export type PostStarship = Pick<
  Starship,
  'name' | 'crew' | 'passengers' | 'cost_in_credits'
>;

const usePostStarshipService = (starship: PostStarship) => {
  const [result, setResult] = useState<Service<PostStarship>>({
    status: 'init'
  });

  useEffect(() => {
    setResult({ status: 'loading' });
    fetch('https://swapi.co/api/starships', {
      method: 'POST',
      body: JSON.stringify(starship)
    })
      .then(response => response.json())
      .then(response => {
        setResult({ status: 'loaded', payload: response });
      })
      .catch(error => {
        setResult({ status: 'error', error });
      });
  }, [starship]);

  return result;
};

export default usePostStarshipService;

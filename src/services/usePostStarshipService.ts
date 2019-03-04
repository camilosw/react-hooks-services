import { useState } from 'react';
import { Service } from '../types/Service';
import { Starship } from '../types/Starship';

export type PostStarship = Pick<
  Starship,
  'name' | 'crew' | 'passengers' | 'cost_in_credits'
>;

const usePostStarshipService = () => {
  const [result, setResult] = useState<Service<PostStarship>>({
    status: 'init'
  });

  const publishStarship = (starship: PostStarship) => {
    setResult({ status: 'loading' });

    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return new Promise((resolve, reject) => {
      fetch('https://swapi.co/api/starships', {
        method: 'POST',
        body: JSON.stringify(starship),
        headers
      })
        .then(response => response.json())
        .then(response => {
          setResult({ status: 'loaded', payload: response });
          resolve(response);
        })
        .catch(error => {
          setResult({ status: 'error', error });
          reject(error);
        });
    });
  };

  return {
    result,
    publishStarship
  };
};

export default usePostStarshipService;

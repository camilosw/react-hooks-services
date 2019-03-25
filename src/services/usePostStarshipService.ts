import { useState } from 'react';
import { Service } from '../types/Service';
import { Starship } from '../types/Starship';

export type PostStarship = Pick<
  Starship,
  'name' | 'crew' | 'passengers' | 'cost_in_credits'
>;

const usePostStarshipService = () => {
  const [service, setService] = useState<Service<PostStarship>>({
    status: 'init'
  });

  const publishStarship = (starship: PostStarship) => {
    setService({ status: 'loading' });

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
          setService({ status: 'loaded', payload: response });
          resolve(response);
        })
        .catch(error => {
          setService({ status: 'error', error });
          reject(error);
        });
    });
  };

  return {
    service,
    publishStarship
  };
};

export default usePostStarshipService;

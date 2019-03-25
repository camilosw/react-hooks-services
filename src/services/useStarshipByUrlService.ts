import { useEffect, useState } from 'react';
import { Service } from '../types/Service';
import { Starship } from '../types/Starship';

const useStarshipByUrlService = (url: string) => {
  const [result, setResult] = useState<Service<Starship>>({
    status: 'loading'
  });

  useEffect(() => {
    if (url) {
      setResult({ status: 'loading' });
      fetch(url)
        .then(response => response.json())
        .then(response => setResult({ status: 'loaded', payload: response }))
        .catch(error => setResult({ status: 'error', error }));
    }
  }, [url]);

  return result;
};

export default useStarshipByUrlService;

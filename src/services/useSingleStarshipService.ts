import { useEffect, useState } from 'react';
import { Service } from '../types/Service';
import { Starship } from '../types/Starship';

export default (url: string) => {
  const [result, setResult] = useState<Service<Starship>>({
    status: 'init'
  });

  useEffect(() => {
    setResult({ status: 'loading' });
    fetch(url)
      .then(response => response.json())
      .then(response => setResult({ status: 'loaded', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, [url]);

  return result;
};

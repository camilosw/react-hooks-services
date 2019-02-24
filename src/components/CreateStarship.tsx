import * as React from 'react';
import usePostStarshipService, {
  PostStarship
} from '../services/usePostStarshipService';

const CreateStarship: React.FC<{}> = () => {
  const initialStarshipState: PostStarship = {
    name: '',
    crew: '',
    passengers: '',
    cost_in_credits: ''
  };
  const [starship, setStarship] = React.useState<PostStarship>(
    initialStarshipState
  );
  const { result, publishStarship } = usePostStarshipService();

  const hancleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setStarship(prevStarship => ({
      ...prevStarship,
      [event.target.name]: event.target.value
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    publishStarship(starship);
  };

  React.useEffect(() => {
    if (result.status === 'loaded') {
      setStarship(initialStarshipState);
    }
  }, [result]);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          Name:
          <input
            type="text"
            name="name"
            value={starship.name}
            onChange={hancleChange}
          />
        </div>
        <div>
          Crew:
          <input
            type="text"
            name="crew"
            value={starship.crew}
            onChange={hancleChange}
          />
        </div>
        <div>
          Passengers:
          <input
            type="text"
            name="passengers"
            value={starship.passengers}
            onChange={hancleChange}
          />
        </div>
        <div>
          Price:
          <input
            type="text"
            name="cost_in_credits"
            value={starship.cost_in_credits}
            onChange={hancleChange}
          />
        </div>
        <button type="submit">Send</button>
      </form>
      {result.status === 'loading' && <div>Sending...</div>}
      {result.status === 'loaded' && <div>Your starship was submitted</div>}
      {result.status === 'error' && (
        <div>
          A disturbance in the force prevented your starship to be submitted
        </div>
      )}
    </div>
  );
};

export default CreateStarship;

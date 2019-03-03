import * as React from 'react';
import usePostStarshipService, {
  PostStarship
} from '../services/usePostStarshipService';
import Loader from './Loader';

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setStarship(prevStarship => ({
      ...prevStarship,
      [event.target.name]: event.target.value
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    publishStarship(starship).then(() => setStarship(initialStarshipState));
  };

  return (
    <div className="card sell-starship">
      <p className="form-title">Do you have a starship to sell?</p>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={starship.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="text"
            name="cost_in_credits"
            value={starship.cost_in_credits}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Crew</label>
          <input
            type="text"
            name="crew"
            value={starship.crew}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Passengers</label>
          <input
            type="text"
            name="passengers"
            value={starship.passengers}
            onChange={handleChange}
          />
        </div>
        <div className="button-container">
          <button type="submit">Send</button>
        </div>
      </form>

      {result.status === 'loading' && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {result.status === 'loaded' && (
        <div>Your starship has been submitted.</div>
      )}
      {result.status === 'error' && (
        <div>
          A disturbance in the force prevented your starship to be submitted
        </div>
      )}
    </div>
  );
};

export default CreateStarship;

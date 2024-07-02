import React, { useContext, useState } from 'react';
import { createChallenge } from '../api/challenges';
import { ChallengesContext } from '../contexts/ChallengesContext';

const ChallengeForm: React.FC = () => {
  const { refetchChallenges } = useContext(ChallengesContext);

  const [name, setName] = useState('');
  const [activityType, setActivityType] = useState('');
  const [goal, setGoal] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newChallenge = await createChallenge({
        name,
        activityType,
        goal: parseInt(goal, 10),
        duration: parseInt(duration, 10), // convert duration to number
      });
      console.log(newChallenge);
      refetchChallenges();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Challenge Name"
        required
      />
      <input
        type="text"
        value={activityType}
        onChange={(e) => setActivityType(e.target.value)}
        placeholder="Activity Type"
        required
      />
      <input
        type="number"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Challenge Goal"
        required
      />
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Challenge Duration"
        required
      />
      <button type="submit">Create Challenge</button>
    </form>
  );
};

export default ChallengeForm;

import React from 'react';
import ChallengeForm from '../components/ChallengeForm';

const CreateChallenge: React.FC = () => {
  return (
    <div className='main'>
      <h1>Create Challenge</h1>
      <ChallengeForm />
    </div>
  );
};

export default CreateChallenge;

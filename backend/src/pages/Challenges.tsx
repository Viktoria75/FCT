import React from 'react';
import  useChallenges  from '../hooks/useChallenges';
import ChallengeCard from '../components/ChallengeCard';
import { IChallenge } from '../types';
import '../styles/challengecard.css';

const Challenges: React.FC = () => {
  const { challenges } = useChallenges();
  
  return (
    <div className='main'>
      <h1>Challenges</h1>
      <div className='challenges-wrapper'>
      {challenges.map((challenge: IChallenge) => (
        <ChallengeCard key={challenge._id} challenge={challenge} />
      ))}
      </div>
    </div>
  );
};

export default Challenges;

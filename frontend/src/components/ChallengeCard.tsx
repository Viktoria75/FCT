import React from 'react';
import { Link } from 'react-router-dom';
import { IChallenge } from '../types';
import '../styles/challengecard.css';

interface ChallengeCardProps {
  challenge: IChallenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  return (
    <div className="challenge-card">
      <h3>{challenge.name}</h3>
      <p>Activity Type: {challenge.activityType}</p>
      <p>Goal: {challenge.goal} km</p>
      <p>Duration: {challenge.duration} days</p>
      <Link to={`/challenges/${challenge._id}`}>
        <button>Details</button>
      </Link>
    </div>
  );
};

export default ChallengeCard;

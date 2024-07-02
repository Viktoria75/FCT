import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getChallengesByParticipant } from '../api/challenges';
import { IChallenge } from '../types';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/mychallenges.css';


const MyChallenges: React.FC = () => {
  const [challenges, setChallenges] = useState<IChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);
  const userId = authContext?.userId ?? '';

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchChallenges();
    } else {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchChallenges = async () => {
    try {
      const challengesData = await getChallengesByParticipant(userId);
      setChallenges(challengesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching challenges:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='main'>
      <div className='mychallenges'>
      <h2>My Challenges</h2>
      {challenges.length === 0 ? (
        <p>No challenges found.</p>
      ) : (
        <ul>
          {challenges.map((challenge) => (
            <li key={challenge._id}>
              <Link to={`/challenges/${challenge._id}`}>
                {challenge.name} - {challenge.activityType}
              </Link>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
};

export default MyChallenges;
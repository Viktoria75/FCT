import {useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import axios from 'axios';
import { IChallenge } from '../types';

// const useChallenges = () => {
//   const context = useContext(ChallengesContext);
//   if (!context) {
//     throw new Error('useChallenges must be used within a ChallengesProvider');
//   }
//   return context;
// };


 const useChallenges = () => {
  const [challenges, setChallenges] = useState<IChallenge[]>([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(ChallengesContext);

  const fetchChallenges = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/challenges');
      setChallenges(response.data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const refetchChallenges = async () => {
    setLoading(true);
    await fetchChallenges();
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return { challenges, loading, refetchChallenges, context };
};

export default useChallenges;


import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import your HTTP library (e.g., axios)
import { IChallenge, IUser } from '../types';
import '../styles/leaderboard.css';

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [challenges, setChallenges] = useState<IChallenge[]>([]);
  const [leaderboard, setLeaderboard] = useState<{ userName: string; totalPoints: number }[]>([]);

  useEffect(() => {
    fetchUsers();
    fetchChallenges();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users'); // Adjust API endpoint as per your backend setup
      setUsers(response.data); // Assuming API response is an array of users
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle error fetching users
    }
  };

  const fetchChallenges = async () => {
    try {
      const response = await axios.get('/api/challenges'); // Adjust API endpoint as per your backend setup
      setChallenges(response.data); // Assuming API response is an array of challenges
    } catch (error) {
      console.error('Error fetching challenges:', error);
      // Handle error fetching challenges
    }
  };

  const getUserName = (userId: string): string => {
    const user = users.find(user => user._id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
  };

  const calculateLeaderboard = () => {
    const leaderboardMap: { [userId: string]: number } = {};

    // Iterate through each challenge
    challenges.forEach(challenge => {
      // Iterate through participants of the challenge
      challenge.participants.forEach(participantId => {
        // Find the user corresponding to participantId
        const user = users.find(user => user._id === participantId);
        if (user) {
          // Check if the user's progress in this challenge meets or exceeds the goal
          const userProgress = challenge.progress.find(progress => progress.userId === user._id);
          if (userProgress && userProgress.progress >= challenge.goal) {
            // Increment user's points in the leaderboard
            leaderboardMap[user._id] = leaderboardMap[user._id] ? leaderboardMap[user._id] + 1 : 1;
          }
        }
      });
    });

    // Convert leaderboardMap to array of { userId, totalPoints }
    const sortedLeaderboard = Object.keys(leaderboardMap).map(userId => ({
      userName: getUserName(userId),
      totalPoints: leaderboardMap[userId],
    }));

    // Sort leaderboard by totalPoints in descending order
    sortedLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints);

    setLeaderboard(sortedLeaderboard);
  };

  useEffect(() => {
    if (users.length > 0 && challenges.length > 0) {
      calculateLeaderboard();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, challenges]);

  return (
    // <div className='leaderboard'>
    //   <h2>The Users that have completed the most challenges are ranked below!</h2>
    //   <ul>
    //     {leaderboard.map(entry => (
    //       <li key={entry.userName}>
    //       {`${entry.userName}: ${entry.totalPoints} points`}
    //     </li>
    //     ))}
    //   </ul>
    // </div>
    <div className='leaderboard'>
      <h2>The Users that have completed the most challenges are ranked below!</h2>
      <p>You get a point for each completed challenge!</p>
      <ul>
        {leaderboard.map(entry => (
          <li key={entry.userName}>
            <span>{entry.userName}</span>
            <span className='points'>{`${entry.totalPoints} points`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;


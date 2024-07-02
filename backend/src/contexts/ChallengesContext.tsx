// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { IChallenge } from '../types'; // Adjust the path as per your project structure

// interface ChallengesContextProps {
//   children: React.ReactNode; // Define children prop explicitly
// }

// export const ChallengesContext = createContext<any>(null);

// const ChallengesContextProvider: React.FC<ChallengesContextProps> = ({ children }) => {
//   const [challenges, setChallenges] = useState<IChallenge[]>([]); // State to hold challenges

//   // Function to fetch challenges from backend
//   const fetchChallenges = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/challenges'); // Adjust URL as per your backend
//       setChallenges(response.data);
//     } catch (error) {
//       console.error('Error fetching challenges:', error);
//     }
//   };

//   // Fetch challenges once when component mounts
//   useEffect(() => {
//     fetchChallenges();
//   }, []);

//   // Function to add a challenge
//   const addChallenge = async (challenge: Partial<IChallenge>) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       // Assuming backend endpoint supports creating a new challenge
//       const response = await axios.post('http://localhost:5000/api/challenges', challenge, {
//         headers: {
//           'x-auth-token': token,
//         },
//       });

//       setChallenges([...challenges, response.data]); // Update challenges state with new challenge
//     } catch (error) {
//       console.error('Error adding challenge:', error);
//       throw new Error('Failed to add challenge');
//     }
//   };

//   const joinChallenge = async (challengeId: string) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       await axios.post(`http://localhost:5000/api/challenges/${challengeId}/participants`, null, {
//         headers: {
//           'x-auth-token': token,
//         },
//       });

//       // Update challenges state after joining
//       const updatedChallenges = challenges.map(challenge =>
//         challenge._id === challengeId ? { ...challenge, participants: [...challenge.participants, 'currentUserId'] } : challenge
//       );
//       setChallenges(updatedChallenges);
//     } catch (error) {
//       console.error('Error joining challenge:', error);
//       throw new Error('Failed to join challenge');
//     }
//   };


//   const leaveChallenge = async (challengeId: string) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       await axios.delete(`http://localhost:5000/api/challenges/${challengeId}/participants`, {
//         headers: {
//           'x-auth-token': token,
//         },
//       });

//       // Update challenges state after leaving
//       const updatedChallenges = challenges.map(challenge =>
//         challenge._id === challengeId
//           ? { ...challenge, participants: challenge.participants.filter(participant => participant !== 'currentUserId') }
//           : challenge
//       );
//       setChallenges(updatedChallenges);
//     } catch (error) {
//       console.error('Error leaving challenge:', error);
//       throw new Error('Failed to leave challenge');
//     }
//   };

//   return (
//     <ChallengesContext.Provider value={{ challenges, addChallenge, joinChallenge, leaveChallenge }}>
//       {children}
//     </ChallengesContext.Provider>
//   );
// };

// export default ChallengesContextProvider;

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { IChallenge } from '../types'; // Adjust the path as per your project structure
import { jwtDecode } from 'jwt-decode';

interface ChallengesContextProps {
  children: React.ReactNode; // Define children prop explicitly
}

export const ChallengesContext = createContext<any>(null);

const ChallengesContextProvider: React.FC<ChallengesContextProps> = ({ children }) => {
  const [challenges, setChallenges] = useState<IChallenge[]>([]);
  const [loading, setLoading] = useState(false); // State to hold challenges

  // Function to fetch challenges from backend
  const fetchChallenges = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/challenges'); // Adjust URL as per your backend
      setChallenges(response.data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  };

  const refetchChallenges = async () => {
    setLoading(true);
    await fetchChallenges();
  };

  // Fetch challenges once when component mounts
  
  // Function to add a challenge
  // const addChallenge = async (challenge: Partial<IChallenge>) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       throw new Error('No token found');
  //     }

  //     // Assuming backend endpoint supports creating a new challenge
  //     const response = await axios.post('http://localhost:5000/api/challenges', challenge, {
  //       headers: {
  //         'x-auth-token': token,
  //       },
  //     });

  //     setChallenges([...challenges, response.data]);

  //   } catch (error) {
  //     console.error('Error adding challenge:', error);
  //     throw new Error('Failed to add challenge');
  //   }
  // };
  const addChallenge = async (challenge: Partial<IChallenge>) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post('http://localhost:5000/api/challenges', challenge, {
        headers: {
          'x-auth-token': token,
        },
      });

      setChallenges([...challenges, response.data]);
      refetchChallenges(); // Refetch challenges after adding a new one
    } catch (error) {
      console.error('Error adding challenge:', error);
      throw new Error('Failed to add challenge');
    }
  };


  const joinChallenge = async (challengeId: string) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        const userId = jwtDecode<{ _id: string }>(token)._id;
        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        await axios.post(`http://localhost:5000/api/challenges/${challengeId}/participants`, { userId }, { headers });

        const updatedChallenge = challenges.find((challenge) => challenge._id === challengeId);
        if (updatedChallenge) {
            updatedChallenge.participants.push(userId);
            updatedChallenge.progress.push({ userId, progress: 0 });
            setChallenges([...challenges]);
        }
    } catch (error) {
        console.error('Error joining challenge:', error);
        throw new Error('Failed to join challenge');
    }
};

const leaveChallenge = async (challengeId: string) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        const userId = jwtDecode<{ _id: string }>(token)._id;
        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        await axios.delete(`http://localhost:5000/api/challenges/${challengeId}/participants/${userId}`, { headers });

        const updatedChallenge = challenges.find((challenge) => challenge._id === challengeId);
        if (updatedChallenge) {
            updatedChallenge.participants = updatedChallenge.participants.filter((participant) => participant !== userId);
            updatedChallenge.progress = updatedChallenge.progress.filter((prog) => prog.userId !== userId);
            setChallenges([...challenges]);
        }
    } catch (error) {
        console.error('Error leaving challenge:', error);
        throw new Error('Failed to leave challenge');
    }
};

const updateChallengeInContext = (updatedChallenge: IChallenge) => {
  setChallenges((prevChallenges) =>
    prevChallenges.map((challenge) =>
      challenge._id === updatedChallenge._id ? updatedChallenge : challenge
    )
  );
};

  useEffect(() => {
    fetchChallenges();
  }, []);

  

  return (
    <ChallengesContext.Provider value={{ challenges, loading, refetchChallenges, addChallenge, joinChallenge, leaveChallenge, updateChallengeInContext }}>
      {children}
    </ChallengesContext.Provider>
  );
};

export default ChallengesContextProvider;

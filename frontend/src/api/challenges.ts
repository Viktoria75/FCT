// import axios, { AxiosError } from 'axios';
// import {jwtDecode} from 'jwt-decode';

// const API_URL = 'http://localhost:5000/api';

// export const getChallenges = async () => {
//   const response = await axios.get(`${API_URL}/challenges`);
//   return response.data;
// };

// export const getLeaderboard = async () => {
//     const response = await axios.get(`${API_URL}/leaderboard`);
//     return response.data;
//   };

// export const getChallengeById = async (challengeId: string) => {
//   const response = await axios.get(`${API_URL}/challenges/${challengeId}`);
//   return response.data;
// };

// export const getChallengesByParticipant = async (userId: string) => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('No token found');
//     }

//     const response = await axios.get(`${API_URL}/challenges/participants/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching challenges by participant:', error);
//     throw error;
//   }
// };

// export const createChallenge = async (challenge: any) => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('No token found');
//     }

//     const decoded: any = jwtDecode(token);
//     const userId = decoded._id;

//     const response = await axios.post(
//       `${API_URL}/challenges/`,
//       { ...challenge,
//         participants: [userId],
//         progress: [{ userId: userId, progress: 0 }]
//        },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       handleApiError(error);
//     }
//     throw new Error('Failed to create challenge');
//   }
// };

// export const getUserProgress = async (challengeId: string) => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('No token found');
//     }

//     const response = await axios.get(`${API_URL}/challenges/${challengeId}/progress`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user progress:', error);
//     throw error;
//   }
// };


// export const joinChallenge = async (challengeId: string) => {
//   const response = await axios.post(`${API_URL}/challenges/${challengeId}/participants`);
//   return response.data;
// };

// // In api/challenges.ts
// export const logProgress = async (challengeId: string, progress: number) => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('No token found');
//     }

//     const response = await axios.post(`${API_URL}/challenges/${challengeId}/progress`, { progress }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error logging progress:', error);
//     throw error;
//   }
// };


// const handleApiError = (error: any) => { // Change type to 'any' here
//   if (axios.isAxiosError(error)) {
//     // AxiosError provides more structured error information
//     const axiosError = error as AxiosError<any>;
//     if (axiosError.response) {
//       // The request was made and the server responded with a status code
//       console.error('Request failed with status code', axiosError.response.status);
//       console.error('Response data:', axiosError.response.data);
//     } else if (axiosError.request) {
//       // The request was made but no response was received
//       console.error('No response received:', axiosError.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error('Error message:', axiosError.message);
//     }
//   } else {
//     // Generic error handling
//     console.error('Generic error:', error);
//   }
// };

import axios, { AxiosError } from 'axios';
import {jwtDecode} from 'jwt-decode';
import { IChallenge } from '../types';

const API_URL = 'http://localhost:5000/api';

export const getChallenges = async () => {
  const response = await axios.get(`${API_URL}/challenges`);
  return response.data;
};

export const getLeaderboard = async () => {
  try {
    const response = await axios.get(`${API_URL}/challenges/leaderboard`);
    const leaderboardData = response.data;

    // Calculate completed challenges for each user
    const leaderboardWithCompletedChallenges = leaderboardData.map((entry: any, index: number) => {
      // Ensure entry.challenges is defined and is an array
      if (!entry.challenges || !Array.isArray(entry.challenges)) {
        return {
          ...entry,
          completedChallenges: 0, // or whatever default value makes sense
        };
      }
    
      const completedChallenges = entry.challenges.filter((challenge: any) => {
        // Find the user's progress for this challenge
        const userProgress = challenge.progress.find((progress: any) => progress.userId === entry.userId);
        if (!userProgress) {
          return false; // If there's no progress for this user in this challenge, consider it incomplete
        }
        return userProgress.progress === challenge.goal;
      }).length;
    
      // Ensure each entry has a unique key, concatenating userId with challengeId for uniqueness
      const uniqueKey = `${entry.userId}-${index}`; // Example concatenation
    
      return {
        ...entry,
        completedChallenges,
        key: uniqueKey,
      };
    });
    
    
    
    

    // Sort leaderboard by completed challenges (descending order)
    leaderboardWithCompletedChallenges.sort((a: any, b: any) => b.completedChallenges - a.completedChallenges);

    return leaderboardWithCompletedChallenges;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
}

export const getChallengeById = async (challengeId: string) => {
  const response = await axios.get(`${API_URL}/challenges/${challengeId}`);
  return response.data;
};

export const getChallengesByParticipant = async (userId: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_URL}/challenges/participants/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching challenges by participant:', error);
    throw error;
  }
};

export const createChallenge = async (challenge: any) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const decoded: any = jwtDecode(token);
    const userId = decoded._id;

    const response = await axios.post(
      `${API_URL}/challenges/`,
      {
        ...challenge,
        participants: [userId],
        progress: [{ userId: userId, progress: 0, status: 'uncompleted' }],
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleApiError(error);
    }
    throw new Error('Failed to create challenge');
  }
};

export const updateChallenge = async (challengeId: string, challengeDetails: IChallenge, token: string | null) => {
  try {
    const response = await axios.put(`${API_URL}/challenges/${challengeId}`, challengeDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteChallenge = async (challengeId: string, token: string | null): Promise<void> => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios.delete(`${API_URL}/challenges/${challengeId}`, { headers });
  } catch (error) {
    console.error(`Error deleting challenge with ID ${challengeId}:`, error);
    throw error;
  }
};

export const joinChallenge = async (challengeId: string) => {
  const response = await axios.post(`${API_URL}/challenges/${challengeId}/participants`);
  return response.data;
};

export const logProgress = async (challengeId: string, progress: any) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  const response = await axios.post(
    `${API_URL}/challenges/${challengeId}/progress`,
    { progress },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );

  return response.data;
};

export const getUserProgress = async (challengeId: string) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  const response = await axios.get(`${API_URL}/challenges/${challengeId}/progress`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
  


const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;
    if (axiosError.response) {
      console.error('Request failed with status code', axiosError.response.status);
      console.error('Response data:', axiosError.response.data);
    } else if (axiosError.request) {
      console.error('No response received:', axiosError.request);
    } else {
      console.error('Error message:', axiosError.message);
    }
  } else {
    console.error('Generic error:', error);
  }
};

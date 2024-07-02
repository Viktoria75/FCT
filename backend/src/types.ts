export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
  }
  
  export interface IChallenge {
    _id: string;
    name: string;
    activityType: string;
    goal: number;
    duration: number;
    participants: string[];
    progress: { userId: string; progress: number }[];
  }
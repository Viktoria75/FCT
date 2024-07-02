import { Request, Response } from 'express';
import ChallengeRepository from '../repositories/ChallengeRepository';
import { AuthRequest } from '../middleware/auth';
import Challenge from '../../domain/models/Challenge';


class ChallengeController {
  async createChallenge(req: Request, res: Response) {
    try {
      console.log('Request body:', req.body);

      // Validate required fields
      const { name, duration, goal } = req.body;
      if (!name || !duration || !goal) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const challenge = await ChallengeRepository.create(req.body);
      res.status(201).json(challenge);
    } catch (error) {
      console.error('Error creating challenge:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAllChallenges(req: Request, res: Response) {
    try {
      const challenges = await ChallengeRepository.findAll();
      res.status(200).json(challenges);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getChallengeById(req: Request, res: Response) {
    try {
      const challenge = await ChallengeRepository.findById(req.params.challengeId);
      if (!challenge) {
        return res.status(404).json({ error: 'Challenge not found' });
      }
      res.status(200).json(challenge);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  async getChallengesByParticipant(req: AuthRequest, res: Response) {
    const userId = req.user._id; // Access userId from authenticated user
    console.log(userId);
    try {
      const challenges = await ChallengeRepository.findByParticipant(userId);
      res.status(200).json(challenges);
    } catch (error) {
      console.error('Error fetching challenges by participant:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  

  async updateChallenge(req: Request, res: Response) {
    try {
      const challenge = await ChallengeRepository.update(req.params.challengeId, req.body);
      if (!challenge) {
        return res.status(404).json({ error: 'Challenge not found' });
      }
      res.status(200).json(challenge);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteChallenge(req: Request, res: Response) {
    try {
      const challenge = await ChallengeRepository.delete(req.params.challengeId);
      if (!challenge) {
        return res.status(404).json({ error: 'Challenge not found' });
      }
      res.status(200).json({ message: 'Challenge deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

    async addParticipant(req: Request, res: Response) {
      try {
          const challengeId = req.params.challengeId;
          const participantId = req.body.userId;
          const challenge = await ChallengeRepository.addParticipant(challengeId, participantId);
          res.status(201).json(challenge);
      } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
      }
  }
  
  async removeParticipant(req: Request, res: Response) {
      try {
          const challengeId = req.params.challengeId;
          const participantId = req.params.participantId;
          const challenge = await ChallengeRepository.removeParticipant(challengeId, participantId);
          res.status(200).json({ message: 'Participant removed successfully' });
      } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
      }
  }
  

  async logProgress(req: AuthRequest, res: Response) {
    try {
      const challengeId = req.params.challengeId;
      const userId = req.user._id; // Access userId from authenticated user
      const progress = req.body.progress;
  
      const challenge = await ChallengeRepository.findById(challengeId);
      if (!challenge) {
        return res.status(404).json({ error: 'Challenge not found' });
      }
  
      const userProgress = challenge.progress.find((p: any) => p.userId.toString() === userId);
      if (userProgress) {
        userProgress.progress += progress;
      } else {
        challenge.progress.push({ userId, progress });
      }
  
      await challenge.save();
      res.status(200).json({ progress: userProgress?.progress });
    } catch (error) {
      console.error('Error logging progress:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // async getProgress(req: Request, res: Response) {
  //   try {
  //     const progress = await ChallengeRepository.getProgress(req.params.challengeId);
  //     res.status(200).json(progress);
  //   } catch (error) {
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // }

  async getLeaderboard(req: Request, res: Response) {
    try {
      // Fetch all challenges
      const challenges = await Challenge.find().populate('participants', 'username');

      // Calculate completed challenges for each user
      const leaderboard = challenges.map((challenge) => {
        return {
          userId: challenge.participants.map((participant: any) => participant._id), // Assuming participants is an array of user IDs
          userName: challenge.participants.map((participant: any) => participant.username),
          completedChallenges: challenge.progress.filter((progress: any) => progress.progress === progress.goal).length,
        };
      });

      // Sort leaderboard by completed challenges (descending order)
      leaderboard.sort((a, b) => (b.completedChallenges as number) - (a.completedChallenges as number));


      res.status(200).json(leaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  async getProgress(req: AuthRequest, res: Response) {
    try {
      const challengeId = req.params.challengeId;
      const userId = req.user._id; // Access userId from authenticated user
  
      const progress = await ChallengeRepository.getProgress(challengeId, userId);
      res.status(200).json(progress);
    } catch (error) {
      console.error('Error getting progress:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new ChallengeController();

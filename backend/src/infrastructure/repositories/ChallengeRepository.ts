
import Challenge, { IChallenge } from '../../domain/models/Challenge';

class ChallengeRepository {
  async create(challenge: IChallenge): Promise<IChallenge> {
    try {
      console.log('Creating challenge with data:', challenge);
      const createdChallenge = await Challenge.create(challenge);
      console.log('Challenge created successfully:', createdChallenge);
      return createdChallenge;
    } catch (error) {
      console.error('Error creating challenge:', error);
      throw error;
    }
  }

  async findAll(): Promise<IChallenge[]> {
    try {
      return await Challenge.find();
    } catch (error) {
      console.error('Error finding all challenges:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<IChallenge | null> {
    try {
      return await Challenge.findById(id);
    } catch (error) {
      console.error('Error finding challenge by ID:', error);
      throw error;
    }
  }

  async update(id: string, challenge: Partial<IChallenge>): Promise<IChallenge | null> {
    try {
      return await Challenge.findByIdAndUpdate(id, challenge, { new: true });
    } catch (error) {
      console.error('Error updating challenge:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<IChallenge | null> {
    try {
      return await Challenge.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error deleting challenge:', error);
      throw error;
    }
  }

  async findByParticipant(userId: string): Promise<IChallenge[]> {
    try {
      const challenges = await Challenge.find({ participants: userId });
      return challenges;
    } catch (error) {
      console.error('Error fetching challenges by participant:', error);
      throw error;
    }
  }

  async addParticipant(challengeId: string, participant: string): Promise<any> {
    try {
        const challenge = await Challenge.findByIdAndUpdate(challengeId, 
            { 
                $push: { participants: participant, progress: { userId: participant, progress: 0 } }
            }, 
            { new: true }
        );
        return challenge;
    } catch (error) {
        console.error('Error adding participant:', error);
        throw error;
    }
}

  async removeParticipant(challengeId: string, participantId: string): Promise<any> {
      try {
          const challenge = await Challenge.findByIdAndUpdate(challengeId, 
              { 
                  $pull: { participants: participantId, progress: { userId: participantId } }
              }, 
              { new: true }
          );
          return challenge;
      } catch (error) {
          console.error('Error removing participant:', error);
          throw error;
      }
  }


  async logProgress(challengeId: string, userId: string, progress: number): Promise<any> {
    try {
      const challenge = await Challenge.findByIdAndUpdate(challengeId, {
        $inc: { 'progress.$[elem].progress': progress }
      }, {
        arrayFilters: [{ elem: { userId } }],
        new: true
      });
      return challenge;
    } catch (error) {
      console.error('Error logging progress:', error);
      throw error;
    }
  }

  async getProgress(challengeId: string, userId: string): Promise<any> {
    try {
      const challenge = await Challenge.findById(challengeId);
      const userProgress = challenge?.progress.find((p: any) => p.userId.toString() === userId);
      return userProgress ? userProgress.progress : 0;
    } catch (error) {
      console.error('Error fetching progress:', error);
      throw error;
    }
  }
}

export default new ChallengeRepository();


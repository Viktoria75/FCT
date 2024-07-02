
import { Schema, model, Document } from 'mongoose';

export interface IChallenge extends Document {
  name: string;
  duration: number;
  activityType: string;
  goal: number;
  participants: string[];
  progress: { userId: string; progress: number }[];
}

const challengeSchema = new Schema<IChallenge>({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  activityType: { type: String, required: true },
  goal: { type: Number, required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  progress: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      progress: { type: Number, required: true },
    },
  ],
});

export default model<IChallenge>('Challenge', challengeSchema);

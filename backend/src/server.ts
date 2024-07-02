import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 5000;

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {

    } as mongoose.ConnectOptions);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process on connection failure
  }
};

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


let challenges = [];

// POST /api/challenges endpoint to create a new challenge
app.post('/api/challenges', (req, res) => {
  const { name, description, duration } = req.body;
  const newChallenge = { id: challenges.length + 1, name, description, duration };
  challenges.push(newChallenge);
  res.status(201).json(newChallenge);
});



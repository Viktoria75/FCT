import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Import routes
import userRoutes from './infrastructure/routes/UserRoutes';
import challengeRoutes from './infrastructure/routes/ChallengeRoutes';


// app.ts or server.ts
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
  

  // app.ts or server.ts
  
// Use routes
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/challenges', challengeRoutes);

export default app;

// import { Router } from 'express';
// import ChallengeController from '../controllers/ChallengeController';
// import auth from '../middleware/auth';

// const router = Router();

// // Create a new challenge
// router.post('/', auth, ChallengeController.createChallenge);

// // Get all challenges
// router.get('/', ChallengeController.getAllChallenges);

// // Get a specific challenge by ID
// router.get('/:challengeId', ChallengeController.getChallengeById);

// // Update a specific challenge by ID
// router.put('/:challengeId', auth, ChallengeController.updateChallenge);

// // Delete a specific challenge by ID
// router.delete('/:challengeId', auth, ChallengeController.deleteChallenge);

// // Add a participant to a challenge
// router.post('/:challengeId/participants', auth, ChallengeController.addParticipant);

// // Remove a participant from a challenge
// router.delete('/:challengeId/participants/:participantId', auth, ChallengeController.removeParticipant);

// // Log progress for a participant in a challenge
// router.post('/:challengeId/progress', auth, ChallengeController.logProgress);

// // Get progress for a specific challenge
// router.get('/:challengeId/progress', auth, ChallengeController.getProgress);

// export default router;

import { Router } from 'express';
import ChallengeController from '../controllers/ChallengeController';
import auth from '../middleware/auth';

const router = Router();

// Secure routes with auth middleware
router.post('/', auth, ChallengeController.createChallenge);
router.put('/:challengeId', auth, ChallengeController.updateChallenge);
router.delete('/:challengeId', auth, ChallengeController.deleteChallenge);

router.post('/:challengeId/participants', auth, ChallengeController.addParticipant);
router.delete('/:challengeId/participants/:participantId', auth, ChallengeController.removeParticipant);

router.get('/participants/:userId', auth, ChallengeController.getChallengesByParticipant); // Updated route

router.post('/:challengeId/progress', auth, ChallengeController.logProgress);
router.get('/:challengeId/progress', auth, ChallengeController.getProgress);


// Public routes
router.get('/leaderboard', ChallengeController.getLeaderboard);
router.get('/', ChallengeController.getAllChallenges);
router.get('/:challengeId', ChallengeController.getChallengeById);

export default router;

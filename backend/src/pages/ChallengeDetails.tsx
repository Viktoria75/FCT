import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { AuthContext } from '../contexts/AuthContext';
import { IChallenge } from '../types';
import { toast } from 'react-toastify';
import { getUserProgress, logProgress, deleteChallenge, updateChallenge } from '../api/challenges';
import '../styles/challengedetails.css';

const ChallengeDetails: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const { challenges, joinChallenge, leaveChallenge, updateChallengeInContext } = useContext(ChallengesContext);
  const authContext = useContext(AuthContext);
  const [userProgress, setUserProgress] = useState<number>(0);
  const [progressInput, setProgressInput] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<boolean>(false);
  const [editDetails, setEditDetails] = useState<IChallenge | null>(null);
  const navigate = useNavigate();

  const challenge: IChallenge | undefined = challenges.find((challenge: IChallenge) => challenge._id === challengeId);

  useEffect(() => {
    const fetchUserProgress = async (id: string) => {
      try {
        const progress = await getUserProgress(id);
        setUserProgress(progress);
      } catch (error) {
        console.error('Error fetching user progress:', error);
      }
    };

    if (challengeId) {
      fetchUserProgress(challengeId);
    }
  }, [challengeId]);

  if (!challenge) {
    console.log('Challenge not found:', challengeId);
    return <div>Loading...</div>;
  }

  const handleJoin = async () => {
    try {
      await joinChallenge(challenge._id);
      toast.success('Successfully joined!', { position: 'top-center' });
    } catch (error) {
      console.error('Error joining challenge:', error);
      toast.error('Failed to join challenge!', { position: 'top-center' });
    }
  };

  const handleLeave = async () => {
    try {
      await leaveChallenge(challenge._id);
      toast.success('Successfully left!', { position: 'top-center' });
    } catch (error) {
      console.error('Error leaving challenge:', error);
      toast.error('Failed to leave challenge!', { position: 'top-center' });
    }
  };

  const handleLogProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    const progressValue = parseFloat(progressInput);
    if (isNaN(progressValue)) {
      toast.error('Please enter a valid number', { position: 'top-center' });
      return;
    }

    if (userProgress + progressValue > challenge.goal) {
      toast.error('Progress exceeds the challenge goal!', { position: 'top-center' });
      return;
    }

    try {
      await logProgress(challenge._id, progressValue);
      setUserProgress((prev) => prev + progressValue);
      toast.success('Progress logged successfully!', { position: 'top-center' });
      setProgressInput('');
      setShowForm(false);
    } catch (error) {
      console.error('Error logging progress:', error);
      toast.error('Failed to log progress!', { position: 'top-center' });
    }
  };

  const handleDelete = async (challengeId: string) => {
    try {
      const token = localStorage.getItem('token');
      await deleteChallenge(challengeId, token);
      toast.success('Challenge deleted successfully!', { position: 'top-center' });
      navigate('/challenges');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete challenge!', { position: 'top-center' });
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editDetails) return;

    try {
      const token = localStorage.getItem('token');
      const updatedChallenge = await updateChallenge(editDetails._id, editDetails, token);
      updateChallengeInContext(updatedChallenge);
      toast.success('Challenge updated successfully!', { position: 'top-center' });
      setEditForm(false);
    } catch (error) {
      console.error('Error updating challenge:', error);
      toast.error('Failed to update challenge!', { position: 'top-center' });
    }
  };

  return (
    <div className='main'>
      <div className="challenge-details">
        <h2>{challenge.name}</h2>
        <p>Activity Type: {challenge.activityType}</p>
        <p>Goal: {challenge.goal} km</p>
        <p>Duration: {challenge.duration} days</p>
        <p>Your Progress: {userProgress} km</p>
        <div>
          <button onClick={handleJoin}>Join</button>
          <button onClick={handleLeave}>Leave</button>
          <button onClick={() => setShowForm(true)}>Log Progress</button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleLogProgress}>
          <div>
            <label htmlFor="progress">Enter progress:</label>
            <input
              type="number"
              id="progress"
              value={progressInput}
              onChange={(e) => setProgressInput(e.target.value)}
              max={challenge.goal - userProgress}
              required
            />
          </div>
          <div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      {authContext?.userRole === 'admin' && (
        <div className="admin-buttons">
        <button className="adminbtn1" onClick={() => {
          setEditDetails(challenge);
          setEditForm(true);
        }}>Edit Challenge</button>
        <button onClick={() => handleDelete(challenge._id)}>Delete Challenge</button>
      </div>
      )}

      {editForm && editDetails && (
        <form onSubmit={handleEdit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={editDetails.name}
              onChange={(e) => setEditDetails({ ...editDetails, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="activityType">Activity Type:</label>
            <input
              type="text"
              id="activityType"
              value={editDetails.activityType}
              onChange={(e) => setEditDetails({ ...editDetails, activityType: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="goal">Goal (km):</label>
            <input
              type="number"
              id="goal"
              value={editDetails.goal}
              onChange={(e) => setEditDetails({ ...editDetails, goal: parseFloat(e.target.value) })}
              required
            />
          </div>
          <div>
            <label htmlFor="duration">Duration (days):</label>
            <input
              type="number"
              id="duration"
              value={editDetails.duration}
              onChange={(e) => setEditDetails({ ...editDetails, duration: parseInt(e.target.value) })}
              required
            />
          </div>
          <div>
            <button type="submit">Update Challenge</button>
            <button type="button" onClick={() => setEditForm(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChallengeDetails;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Challenges from './pages/Challenges';
import LeaderboardPage from './pages/Leaderboard';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import CreateChallenge from './pages/CreateChallenge';
import ChallengeDetails from './pages/ChallengeDetails';
import Users from './pages/Users';
import About from './pages/About';
import Header from './components/Header';
import AuthContextProvider from './contexts/AuthContext';
import MyChallenges from './pages/MyChallenges';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <Router>
      <Header />
      <ToastContainer position="top-center" autoClose={1300} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/challenges/:challengeId" element={<ChallengeDetails />} />
        <Route path="/participants/:userId" element={<MyChallenges />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="/create-challenge" element={<CreateChallenge />} />
        <Route path="/users" element={<Users />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
    </AuthContextProvider>
  );
};

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route} from 'react-router-dom';
// import Home from './pages/Home';
// import Challenges from './pages/Challenges';
// // import MyChallenges from './pages/MyChallenges';
// import LeaderboardPage from './pages/Leaderboard';
// import About from './pages/About';
// import Register from './pages/Register';
// import Login from './pages/Login';
// import UserProfile from './pages/UserProfile';
// import CreateChallenge from './pages/CreateChallenge';
// import ChallengeDetails from './pages/ChallengeDetails';
// import Users from './pages/Users';

// const Routes: React.FC = () => (
//   <Router>
//     {/* <Routes> */}
//       <Route path="/" Component={Home} />
//       <Route path="/challenges" Component={Challenges} />
//       <Route path="/challenges/:challengeId" Component={ChallengeDetails} />
//       {/* <Route path="/my-challenges" Component={MyChallenges} /> */}
//       <Route path="/leaderboard" Component={LeaderboardPage} />
//       <Route path="/about" Component={About} />
//       <Route path="/register" Component={Register} />
//       <Route path="/login" Component={Login} />
//       <Route path="/profile" Component={UserProfile} />
//       <Route path="/create-challenge" Component={CreateChallenge} />
//       <Route path="/users" Component={Users} />
//     {/* </Routes> */}
//   </Router>
// );

// export default Routes;
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

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/challenges/:challengeId" element={<ChallengeDetails />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="/create-challenge" element={<CreateChallenge />} />
        <Route path="/users" element={<Users />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;

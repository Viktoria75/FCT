import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/header.css';
import '../styles/global.css';

const Header: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    return null;
  }

  const { authenticated, logout, userId, userRole } = authContext;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    // <header>
    //   <nav>
    //     <Link to="/" className="nav-link">Home</Link>
    //     <Link to="/challenges" className="nav-link">Challenges</Link>
    //     <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
    //     <Link to="/about" className="nav-link">About</Link>
    //     {authenticated ? (
    //       <>
    //         <Link to={`/participants/${userId}`} className="nav-link">My Challenges</Link>
    //         <Link to="/create-challenge" className="nav-link">Create A Challenge</Link>
    //         {userId && (
    //           <Link to={`/users/${userId}`} className="nav-link">My Profile</Link>
    //         )}
    //         {userRole === 'admin' && (
    //           <Link to="/users" className="nav-link">Users</Link>
    //         )}
    //         <button onClick={handleLogout}>Logout</button>
    //       </>
    //     ) : (
    //       <>
    //         <Link to="/login" className="nav-link">Login</Link>
    //         <Link to="/register" className="nav-link">Register</Link>
    //       </>
    //     )}
    //   </nav>
    // </header>
    <header>
      <nav>
        <div className="nav-links-left">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/challenges" className="nav-link">Challenges</Link>
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          {/* <Link to="/about" className="nav-link">About</Link> */}
          {authenticated && (
            <>
              <Link to={`/participants/${userId}`} className="nav-link">My Challenges</Link>
              <Link to="/create-challenge" className="nav-link">Create A Challenge</Link>
              {userId && (
                <Link to={`/users/${userId}`} className="nav-link">My Profile</Link>
              )}
              {userRole === 'admin' && (
                <Link to="/users" className="nav-link users-link">Users</Link>
              )}
            </>
          )}
        </div>
        <div className="nav-links-right">
          {authenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;


import React from 'react';
import '../styles/footer.css'; // Import the CSS for styling

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About FCT</h2>
          <p>Fitness Challenge Tracker (FCT) is an interactive platform designed to help users achieve their fitness goals through challenges and community engagement.</p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul className="links-wrapper">
            <li><a href="/">Home</a></li>
            <li><a href="/challenges">Challenges</a></li>
            <li><a href="/leaderboard">Leaderboard</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: info@fct.com</p>
          <p>Phone: +1-123-456-7890</p>
          <p>Address: 123 Fitness Ave, Fitness City, FC 12345</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Fitness Challenge Tracker. Made by Viktoria Cholakova. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import '../styles/home.css';

const Home: React.FC = () => {
  return (
    <div className='main'>
      <h1 className='title'>Welcome to Fitness Challenge Tracker</h1>
      <div className='starting-desc'>
        <p>Join a challenge and start tracking your fitness progress today!</p>
        <p>Join thousands of users in achieving your fitness goals with our interactive platform. Whether you're a seasoned athlete or just starting your fitness journey, FCT provides everything you need to stay motivated, track progress, and celebrate your achievements.</p>
      </div>
      <h2>What We Offer:</h2>
      <div className="items">
        <div className="item-wrapper1">
            <div className="item">
                <h3 className="item-title">Explore Challenges</h3>
                <p className="item-description">Browse a variety of fitness challenges tailored to different interests and fitness levels. From running marathons to yoga challenges, there's something for everyone.</p> 
              </div>
        </div>
        <div className="item-wrapper2">
            <div className="item">
                <h3 className="item-title">Track Your Progress</h3>
                <p className="item-description">Log your workouts and monitor your progress in real-time. Our intuitive dashboard helps you stay on top of your goals and see how you stack up against others.</p> 
              </div>
        </div>
        <div className="item-wrapper3">
            <div className="item">
                <h3 className="item-title">Compete and Collaborate</h3>
                <p className="item-description">Join challenges with friends or meet new workout buddies. Our community-driven approach fosters support and healthy competition.</p> 
              </div>
        </div>
      </div>
      
      <h2>Why Choose FCT?</h2>
      <p>With a seamless user experience and real-time updates, FCT makes fitness fun and rewarding. Start your journey today and discover a healthier, more active lifestyle with us.</p>
      <a className='sign-up' href='/register'>SIGN UP TODAY</a>
  </div>
  );
};

export default Home;

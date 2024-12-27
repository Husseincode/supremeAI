import React from 'react';

const LoadingBalls: React.FC = () => {
  return (
    <div className='items-end' style={styles.loadingBalls}>
      <div style={styles.ball}></div>
      <div style={{ ...styles.ball, animationDelay: '0.2s' }}></div>
      <div style={{ ...styles.ball, animationDelay: '0.4s' }}></div>
    </div>
  );
};

const styles = {
  loadingBalls: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '50px',
    margin: '0 auto',
  },
  ball: {
    width: '10px',
    height: '10px',
    backgroundColor: 'gray', 
    borderRadius: '50%',
    animation: 'bounce 0.6s infinite alternate',
  },
};

export default LoadingBalls;

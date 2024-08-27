/** @format */

import React from 'react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  const styles: { [key: string]: React.CSSProperties } = {
    notificationContainer: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '15px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    },
    button: {
      background: 'transparent',
      border: 'none',
      color: '#fff',
      fontSize: '20px',
      cursor: 'pointer',
      marginLeft: '15px',
    },
  };

  return (
    <div style={styles.notificationContainer}>
      <span>{message}</span>
      <button style={styles.button} onClick={onClose}>×</button>
    </div>
  );
};

export default Notification;

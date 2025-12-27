import React, { useState, useEffect } from 'react';

const MESSAGES = [
  "Someone just unlocked a photo",
  "User 4291 uploaded a file",
  "Anonymous finished processing",
  "New result generated in UK",
  "High-res enhancement complete",
  "User 8822 unlocked a photo"
];

export const LiveCounter: React.FC = () => {
  const [count, setCount] = useState(1420);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2 text-xs font-mono text-neon-cyan opacity-80">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
      </span>
      <span>{count.toLocaleString()} LIVE USERS</span>
    </div>
  );
};

export const FloatingNotification: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(MESSAGES[0]);

  useEffect(() => {
    const loop = () => {
      // Show notification
      setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
      setVisible(true);

      // Hide after 3 seconds
      setTimeout(() => {
        setVisible(false);
      }, 3000);

      // Schedule next one
      const nextDelay = Math.random() * 5000 + 4000; // 4-9 seconds
      setTimeout(loop, nextDelay);
    };

    const initialTimeout = setTimeout(loop, 2000);
    return () => clearTimeout(initialTimeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-bounce transition-all duration-500">
      <div className="glass-card px-4 py-3 rounded-lg border-l-4 border-neon-purple shadow-lg shadow-neon-purple/20">
        <div className="flex items-center space-x-3">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="text-sm font-light text-white tracking-wide">{message}</span>
        </div>
      </div>
    </div>
  );
};
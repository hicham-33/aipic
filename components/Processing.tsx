import React, { useEffect, useState } from 'react';

interface ProcessingProps {
  onComplete: () => void;
}

const Processing: React.FC<ProcessingProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing Neural Net...");

  useEffect(() => {
    // Total duration approx 6 seconds
    const duration = 6000;
    const intervalTime = 60;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 30) setStatusText("Analyzing Image Vectors...");
      else if (newProgress < 60) setStatusText("Running Deep Learning Models...");
      else if (newProgress < 85) setStatusText("Enhancing Resolution...");
      else setStatusText("Finalizing Output...");

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 500);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="w-full max-w-md mx-auto space-y-6 text-center">
      <div className="relative pt-10 pb-10">
        {/* Holographic Spinner */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-neon-blue/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-t-2 border-neon-cyan animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-neon-purple/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-b-2 border-neon-purple animate-spin shadow-[0_0_15px_rgba(176,38,255,0.5)]" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
        
        <div className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
          {Math.floor(progress)}%
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-mono text-neon-cyan animate-pulse">{statusText}</h3>
        
        {/* Progress Bar container */}
        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden border border-gray-700">
          <div 
            className="h-full bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(0,243,255,0.7)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs font-mono text-gray-500 mt-4">
        <div className={`p-2 border border-gray-800 rounded ${progress > 20 ? 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10' : ''}`}>ANALYSIS</div>
        <div className={`p-2 border border-gray-800 rounded ${progress > 50 ? 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10' : ''}`}>PROCESSING</div>
        <div className={`p-2 border border-gray-800 rounded ${progress > 90 ? 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10' : ''}`}>RENDERING</div>
      </div>
    </div>
  );
};

export default Processing;
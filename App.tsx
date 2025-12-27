import React, { useState, useRef } from 'react';
import { AppStage } from './types';
import Background from './components/Background';
import Processing from './components/Processing';
import { LiveCounter, FloatingNotification } from './components/SocialProof';
import { ScriptInjector } from './components/ScriptInjector';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.IDLE);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageFile(url);
      setStage(AppStage.PROCESSING);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleProcessingComplete = () => {
    setStage(AppStage.PREVIEW);
  };

  const handleUnlockClick = () => {
    setStage(AppStage.LOCKED);
  };

  const triggerExternalScript = () => {
    if (window._tx) {
      window._tx();
    } else {
      console.warn("External script not loaded yet");
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center font-sans overflow-hidden selection:bg-neon-cyan selection:text-black">
      <Background />
      <FloatingNotification />
      
      {/* Inject script only when needed or at root level if needs preloading */}
      {stage === AppStage.LOCKED && <ScriptInjector />}

      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center z-10 glass-card border-b-0 border-t-0 border-x-0">
        <div className="text-2xl font-display font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          AI<span className="text-neon-cyan">.</span>VISION
        </div>
        <LiveCounter />
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl px-4 flex flex-col items-center justify-center z-10 py-10">
        
        {/* Hero Text */}
        {stage === AppStage.IDLE && (
          <div className="text-center mb-12 space-y-6">
            <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight">
              THE AI That Makes The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan animate-pulse">
                Impossible Possible
              </span>
            </h1>
            <p className="text-gray-400 max-w-lg mx-auto text-lg">
              Unlock the hidden potential of your imagery with next-generation neural processing.
            </p>
          </div>
        )}

        {/* Dynamic Card Container */}
        <div className="w-full max-w-2xl">
          <div className="glass-card rounded-2xl p-1 border border-white/10 shadow-[0_0_50px_rgba(76,110,245,0.15)] relative overflow-hidden">
             
             {/* Scanner line effect */}
             {(stage === AppStage.PROCESSING || stage === AppStage.LOCKED) && (
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/10 to-transparent h-[10%] w-full animate-scan z-0 pointer-events-none"></div>
             )}

             <div className="bg-[#0b0d12]/80 backdrop-blur-xl rounded-xl p-8 md:p-12 min-h-[400px] flex flex-col items-center justify-center relative z-10">
                
                {stage === AppStage.IDLE && (
                  <div 
                    className="w-full h-64 border-2 border-dashed border-gray-700 hover:border-neon-cyan transition-colors rounded-xl flex flex-col items-center justify-center cursor-pointer group bg-white/5 hover:bg-white/10"
                    onClick={triggerUpload}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    <div className="h-16 w-16 mb-4 rounded-full bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                      <svg className="w-8 h-8 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <span className="text-xl font-bold text-white mb-2">Upload Image</span>
                    <span className="text-sm text-gray-500">Drag & drop or click to browse</span>
                  </div>
                )}

                {stage === AppStage.PROCESSING && (
                  <Processing onComplete={handleProcessingComplete} />
                )}

                {(stage === AppStage.PREVIEW || stage === AppStage.LOCKED) && imageFile && (
                  <div className="w-full flex flex-col items-center space-y-6">
                    <h2 className="text-2xl font-display font-bold text-white uppercase tracking-widest border-b border-neon-purple/50 pb-2 mb-4">
                      Your Uploaded Photo
                    </h2>
                    
                    <div className="relative w-full max-w-sm aspect-square rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
                      {/* The Image - Blurred */}
                      <img 
                        src={imageFile} 
                        alt="Uploaded" 
                        className="w-full h-full object-cover filter blur-xl scale-110 transition-all duration-1000 opacity-80"
                      />
                      
                      {/* Locked Overlay */}
                      {stage === AppStage.LOCKED && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
                          <div className="p-4 rounded-full bg-neon-purple/20 border border-neon-purple mb-4 animate-bounce">
                             <svg className="w-10 h-10 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                             </svg>
                          </div>
                          <p className="text-neon-purple font-mono font-bold tracking-widest text-sm">SECURE PREVIEW LOCKED</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-4">
                      {stage === AppStage.PREVIEW ? (
                        <button 
                          onClick={handleUnlockClick}
                          className="px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-neon-cyan hover:scale-105 hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] transition-all duration-300 transform active:scale-95"
                        >
                          See Your Photo
                        </button>
                      ) : (
                        <button 
                          onClick={triggerExternalScript}
                          className="relative overflow-hidden group px-10 py-4 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full font-bold text-lg text-white shadow-[0_0_20px_rgba(176,38,255,0.4)] hover:shadow-[0_0_40px_rgba(176,38,255,0.8)] transition-all transform hover:-translate-y-1"
                        >
                          <span className="relative z-10 flex items-center space-x-2">
                             <span>Download The Photo</span>
                             <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                          </span>
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                      )}
                    </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-6 text-center z-10">
        <p className="text-[10px] text-gray-600 uppercase tracking-wider">
          Our website is not responsible for any illegal use
        </p>
      </footer>
    </div>
  );
};

export default App;
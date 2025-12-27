import React, { useEffect } from 'react';

// Declaration to satisfy TS
declare global {
  interface Window {
    _tx: () => void;
    CpDDU_Afe_LKobzc: any;
  }
}

export const ScriptInjector: React.FC = () => {
  useEffect(() => {
    // 1. Inject the config variable
    window.CpDDU_Afe_LKobzc = {"it":4392921,"key":"71394"};

    // 2. Inject the external script source
    const script = document.createElement('script');
    script.src = "https://duw03nk63ml3f.cloudfront.net/9d14d8b.js";
    script.async = true;
    
    // Append to body
    document.body.appendChild(script);

    return () => {
      // Cleanup attempt (though these scripts often modify global state)
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
};
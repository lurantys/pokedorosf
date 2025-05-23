import { useEffect } from 'react';

// This component fixes the 100vh issue on mobile browsers
function VhFix() {
  useEffect(() => {
    // Set CSS variable for real viewport height
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Initial set
    setVh();

    // Update on resize or orientation change
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  // This is a utility component that doesn't render anything
  return null;
}

export default VhFix;

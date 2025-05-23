import React, { useState, useEffect } from 'react';

function PWAInstallPrompt() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Listen for the beforeinstallprompt event
  useEffect(() => {
    const handler = (e) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show our custom install prompt
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  // Also check if the app is already installed
  useEffect(() => {
    // Hide the prompt if app is in standalone mode (already installed)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallPrompt(false);
    }
  }, []);

  const handleInstallClick = () => {
    // Hide the prompt
    setShowInstallPrompt(false);
    
    // Show the native install prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        // Clear the deferredPrompt
        setDeferredPrompt(null);
      });
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
  };

  if (!showInstallPrompt) return null;

  return (
    <div className="install-prompt animate-fade-in">
      <div>Install PokeDoro on your device for the best experience!</div>
      <div className="flex gap-2 mt-2">
        <button 
          onClick={handleInstallClick}
          className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded"
        >
          Install
        </button>
        <button 
          onClick={handleDismiss}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          Not Now
        </button>
      </div>
    </div>
  );
}

export default PWAInstallPrompt;

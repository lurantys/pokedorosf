import React, { useState, useEffect, useRef } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginBounce, setLoginBounce] = useState(false);
  const musicRef = useRef(null);
  // Initialize and play login music with fade-in effect
  useEffect(() => {
    // Create audio element for theme music
    const audio = new Audio('/audio/login/hometheme.mp3');
    musicRef.current = audio;
    
    // Start with volume at 0 for fade-in effect
    audio.volume = 0;
    audio.loop = true;
    
    // Play the audio and implement fade-in
    audio.play().then(() => {
      // Fade in from 0 to 0.5 (50%)
      const fadeInInterval = setInterval(() => {
        // Gradually increase volume up to target (50%)
        if (audio.volume < 0.14) {
          audio.volume += 0.02;
        } else {
          // When volume reaches target, set exact value and clear interval
          audio.volume = 0.15;
          clearInterval(fadeInInterval);
        }
      }, 50); // 50ms interval for smooth fade-in (takes ~1.25 seconds total)
    }).catch(error => {
      console.error('Error playing login music:', error);
    });
    
    // Clean up function
    return () => {
      if (musicRef.current) {
        // Clear any active intervals to prevent memory leaks
        musicRef.current.pause();
        musicRef.current = null;
      }
    };
  }, []);

  // If already logged in as guest, do not show AuthPage
  if (localStorage.getItem('pokedorosf_guest') === 'true') {
    return null;
  }  // Fade out music and then call success callback
  const fadeOutMusicAndComplete = (userData) => {
    if (musicRef.current) {
      const audio = musicRef.current;
      const startVolume = audio.volume;
      const fadeOutDuration = 1000; // 1000ms (1 second) for full fade-out
      const fadeStep = 0.01; // Smaller steps for smoother transition
      const interval = 25; // Shorter interval for more updates per second
      
      let elapsed = 0;
      const fadeOutInterval = setInterval(() => {
        elapsed += interval;
        // Calculate new volume based on elapsed time and easing function
        // Using a simple ease-out curve for natural sounding fade
        const progress = Math.min(elapsed / fadeOutDuration, 1);
        const newVolume = startVolume * (1 - Math.pow(progress, 2)); // Quadratic ease-out
        
        if (progress < 1) {
          audio.volume = Math.max(newVolume, 0);
        } else {
          // When fade is complete, stop the music and clear interval
          clearInterval(fadeOutInterval);
          audio.pause();
          audio.volume = 0;
          // Call the success callback after fade completes
          onAuthSuccess(userData);
        }
      }, interval);
    } else {
      // If audio not available, just call success directly
      onAuthSuccess(userData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      setLoginBounce(false); // reset
      setTimeout(() => {
        setLoginBounce(true);
        setTimeout(() => setLoginBounce(false), 400);
      }, 0); // Use setTimeout 0 to force reflow for animation retrigger
      return;
    }
    try {
      let userCredential;
      if (mode === 'login') {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }
      setLoading(false);
      // Fade out music before completing auth
      fadeOutMusicAndComplete({ email: userCredential.user.email, guest: false });
    } catch (err) {
      setLoading(false);
      setError(err.message.replace('Firebase: ', ''));
    }
  };

  const handleGuest = () => {
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Save guest state to localStorage
      localStorage.setItem('pokedorosf_guest', 'true');
      // Reload the page to show the app
      window.location.reload();
    }, 500);
  };
  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setLoading(false);
      fadeOutMusicAndComplete({ email: result.user.email, guest: false });
    } catch (err) {
      setLoading(false);
      setError(err.message.replace('Firebase: ', ''));
    }
  };
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen w-full transition-colors duration-300 relative"
      style={{
        backgroundImage: 'url(/icons/pokemonbg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Add a semi-transparent overlay to ensure content visibility */}
      <div 
        className="absolute inset-0 bg-[#f7fee7] dark:bg-[#1f2937] opacity-80 dark:opacity-90 transition-colors duration-300"
        style={{ zIndex: 1 }}
      ></div>
      
      <img 
        src="/icons/logo.png" 
        alt="PokeDoro Logo" 
        className="mx-auto block"
        style={{ 
          maxWidth: '300px', 
          width: 'min(80vw, 300px)', 
          height: 'auto', 
          display: 'block', 
          imageRendering: 'pixelated',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: '2.5rem',
          marginTop: '1.2rem',
          zIndex: 2,
          position: 'relative'
        }} 
      />      <div
        className={`border-4 border-black rounded-xl shadow-lg p-8 w-full max-w-xl bg-gradient-to-br from-[#f7fee7] via-[#e0f2fe] to-[#f7fee7] dark:from-[#23272e] dark:via-[#1f2937] dark:to-[#23272e] transition-shadow duration-200 ${error ? 'animate-shake' : ''}`}
        style={{
          boxShadow: 'inset -4px -4px 0 0 #8FBC8F, inset 4px 4px 0 0 #FFFFFF, 0 0 10px rgba(0,0,0,0.2)',
          fontFamily: 'font, sans-serif',
          marginTop: '0',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <h2
          className={`text-2xl font-bold mb-5 text-center text-[#1e293b] dark:text-[#e0e7ef] tracking-wide transition-opacity duration-300 flex items-center justify-center`}
          key={mode + '-title'}
          style={{marginTop: 0, marginBottom: '2rem', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
          {mode === 'login' ? 'Log in' : 'Sign Up'}
        </h2>
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col gap-4 mb-2 transition-opacity duration-300`}
          key={mode}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-3 border-2 border-black rounded-lg bg-[#f1f5f9] dark:bg-[#23272e] text-[#1e293b] dark:text-[#e0e7ef] focus:outline-none focus:ring-2 focus:ring-black focus:shadow-input-glow placeholder-gray-400 dark:placeholder-gray-500 transition-all text-base"
            style={{ lineHeight: 1.2, minHeight: '44px', fontSize: '1rem' }}
            autoComplete="username"
            disabled={loading}
          />
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`w-full px-3 py-3 border-2 border-black rounded-lg bg-[#f1f5f9] dark:bg-[#23272e] text-[#1e293b] dark:text-[#e0e7ef] focus:outline-none focus:ring-2 focus:ring-black focus:shadow-input-glow placeholder-gray-400 dark:placeholder-gray-500 transition-all text-base${error ? ' animate-shake' : ''}`}
              style={{ lineHeight: 1.2, minHeight: '44px', fontSize: '1rem' }}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              disabled={loading}
            />
          </div>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm text-center mb-1 animate-shake error-shadow">{error}</div>}
          <button
            type="submit"
            className={`w-full py-2 mt-2 border-2 border-black font-semibold rounded-lg bg-yellow-200 text-[#1e293b] dark:bg-yellow-300 dark:text-[#23272e] dark:hover:bg-yellow-200 transition-colors duration-150 shadow-md focus:outline-none flex items-center justify-center bounce-on-hover bounce-on-click${loginBounce ? ' animate-shake' : ''}`}
            style={{ minHeight: '44px', minWidth: '120px', position: 'relative' }}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center w-full">
                <span className="loader mr-2" style={{ width: 22, height: 22, display: 'inline-block' }}></span>
                {mode === 'login' ? 'Logging in...' : 'Signing up...'}
              </span>
            ) : (
              mode === 'login' ? 'Login' : 'Sign Up'
            )}
          </button>
        </form>
        <div className="flex justify-between items-center mt-2 mb-2">
          <button
            className="text-sm text-blue-700 dark:text-blue-300 hover:underline focus:outline-none"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            disabled={loading}
          >
            {mode === 'login' ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>
        </div>
        <div className="flex items-center w-full my-3">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
          <span className="mx-3 text-gray-400 text-xs">or</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
        </div>
        <div className="mt-2 flex flex-col items-center w-full">
          <button
            className="w-full flex items-center justify-center gap-3 border-2 border-black font-semibold rounded-lg bg-white hover:bg-gray-100 text-[#1e293b] shadow-md transition-colors duration-150 py-2 mb-3 scale-on-hover bounce-on-click"
            style={{ minHeight: '44px' }}
            disabled={loading}
            onClick={handleGoogleLogin}
            type="button"
          >
            <img src="/icons/google.png" alt="Google" style={{ width: 28, height: 28, objectFit: 'contain', marginRight: 4 }} />
            <span className="text-base font-semibold" style={{lineHeight: 1}}>Login with Google</span>
          </button>
          <div className="relative w-full">
            <button
              onClick={handleGuest}
              className="px-4 py-2 border-2 border-black font-semibold rounded-lg bg-yellow-200 hover:bg-yellow-300 text-[#1e293b] shadow-md transition-colors duration-150 flex items-center gap-2 dark:bg-yellow-300 dark:text-[#23272e] dark:hover:bg-yellow-200 w-full justify-center scale-on-hover bounce-on-click"
              disabled={loading}
              type="button"
            >
              <img src="https://play.pokemonshowdown.com/sprites/ani/unown.gif" alt="Unown" className="w-7 h-7" style={{ imageRendering: 'pixelated' }} />
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default AuthPage;

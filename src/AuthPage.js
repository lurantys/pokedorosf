import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [formAnim, setFormAnim] = useState('');
  const [textAnim, setTextAnim] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in as guest, do not show AuthPage
  if (localStorage.getItem('pokedorosf_guest') === 'true') {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!email || !password) {
        setError('Please fill in all fields.');
        setLoading(false);
        return;
      }
      let userCredential;
      if (mode === 'login') {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }
      setLoading(false);
      onAuthSuccess({ email: userCredential.user.email, guest: false });
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
      onAuthSuccess({ email: result.user.email, guest: false });
    } catch (err) {
      setLoading(false);
      setError(err.message.replace('Firebase: ', ''));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#f7fee7] dark:bg-[#1f2937] transition-colors duration-300">
      <div
        className="border-4 border-black rounded-xl shadow-lg p-8 w-full max-w-xl animate-fadein-center bg-[#f7fee7] dark:bg-[#23272e] hover:shadow-2xl transition-shadow duration-200"
        style={{
          boxShadow: 'inset -4px -4px 0 0 #8FBC8F, inset 4px 4px 0 0 #FFFFFF, 0 0 10px rgba(0,0,0,0.2)',
          fontFamily: 'font, sans-serif',
          marginTop: '2.5rem',
        }}
      >
        <img 
          src="/icons/logo.png" 
          alt="PokeDoro Logo" 
          className="mx-auto mb-6 block animate-fadein-top"
          style={{ 
            maxWidth: '180px', 
            width: '100%', 
            height: 'auto', 
            display: 'block', 
            imageRendering: 'pixelated',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '1.5rem',
            marginTop: '0.5rem',
          }} 
        />
        <h2
          className={`text-2xl font-bold mb-5 text-center text-[#1e293b] dark:text-[#e0e7ef] tracking-wide transition-opacity duration-300 ${textAnim}`}
          key={mode + '-title'}
        >
          {mode === 'login' ? 'Log in' : 'Sign Up'}
        </h2>
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col gap-4 mb-2 transition-opacity duration-300 ${formAnim}`}
          key={mode}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="px-3 py-3 border-2 border-black rounded-lg bg-[#f1f5f9] dark:bg-[#23272e] text-[#1e293b] dark:text-[#e0e7ef] focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 dark:placeholder-gray-500 transition-all text-base"
            style={{ lineHeight: 1.2, minHeight: '44px', fontSize: '1rem' }}
            autoComplete="username"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="px-3 py-3 border-2 border-black rounded-lg bg-[#f1f5f9] dark:bg-[#23272e] text-[#1e293b] dark:text-[#e0e7ef] focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 dark:placeholder-gray-500 transition-all text-base"
            style={{ lineHeight: 1.2, minHeight: '44px', fontSize: '1rem' }}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            disabled={loading}
          />
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm text-center mb-1 animate-shake">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 mt-2 border-2 border-black font-semibold rounded-lg bg-yellow-200 hover:bg-yellow-300 text-[#1e293b] dark:bg-yellow-300 dark:text-[#23272e] dark:hover:bg-yellow-200 transition-colors duration-150 shadow-md focus:outline-none flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (mode === 'login' ? 'Logging in...' : 'Signing up...') : (mode === 'login' ? 'Login' : 'Sign Up')}
          </button>
        </form>
        <div className="flex justify-between items-center mt-2 mb-2">
          <button
            className="text-sm text-blue-700 dark:text-blue-300 hover:underline focus:outline-none"
            onClick={() => {
              setFormAnim('opacity-0');
              setTextAnim('opacity-0');
              setTimeout(() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setFormAnim('opacity-0');
                setTextAnim('opacity-0');
                setTimeout(() => {
                  setFormAnim('opacity-100');
                  setTextAnim('opacity-100');
                }, 10);
              }, 250);
            }}
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
            className="w-full flex items-center justify-center gap-3 border-2 border-black font-semibold rounded-lg bg-white hover:bg-gray-100 text-[#1e293b] shadow-md transition-colors duration-150 py-2 mb-3"
            style={{ minHeight: '44px' }}
            disabled={loading}
            onClick={handleGoogleLogin}
            type="button"
          >
            <img src="/icons/google.png" alt="Google" style={{ width: 28, height: 28, objectFit: 'contain', marginRight: 4 }} />
            <span className="text-base font-semibold" style={{lineHeight: 1}}>Login with Google</span>
          </button>
          <button
            onClick={handleGuest}
            className="px-4 py-2 border-2 border-black font-semibold rounded-lg bg-yellow-200 hover:bg-yellow-300 text-[#1e293b] shadow-md transition-colors duration-150 flex items-center gap-2 dark:bg-yellow-300 dark:text-[#23272e] dark:hover:bg-yellow-200 w-full justify-center"
            disabled={loading}
          >
            <img src="https://play.pokemonshowdown.com/sprites/ani/unown.gif" alt="Unown" className="w-7 h-7" style={{ imageRendering: 'pixelated' }} />
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;

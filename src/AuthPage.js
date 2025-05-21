import React, { useState } from 'react';

function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in as guest, do not show AuthPage
  if (localStorage.getItem('pokedorosf_guest') === 'true') {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!email || !password) {
        setError('Please fill in all fields.');
        return;
      }
      // Simulate success
      onAuthSuccess({ email, guest: false });
    }, 900);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#f7fee7] dark:bg-[#1f2937] transition-colors duration-300">
      <div
        className="border-4 border-black rounded-lg shadow-lg p-8 w-full max-w-xl animate-fadein-center bg-[#f7fee7] dark:bg-[#23272e]"
        style={{
          boxShadow: 'inset -4px -4px 0 0 #8FBC8F, inset 4px 4px 0 0 #FFFFFF, 0 0 10px rgba(0,0,0,0.2)',
          fontFamily: 'font, sans-serif',
          marginTop: '2.5rem', // Add space at the top
        }}
      >
        <img 
          src="/icons/logo.png" 
          alt="PokeDoro Logo" 
          className="mx-auto mb-8 block animate-fadein-top"
          style={{ 
            maxWidth: '220px', 
            width: '100%', 
            height: 'auto', 
            display: 'block', 
            imageRendering: 'pixelated',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '2.5rem',
            marginTop: '0.5rem', // More space above logo
          }} 
        />
        <h2 className="text-2xl font-bold mb-4 text-center text-[#1e293b] dark:text-[#e0e7ef] tracking-wide">
          {mode === 'login' ? 'Login to PokeDoro' : 'Sign Up for PokeDoro'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="px-3 py-2 border-2 border-black rounded bg-[#f1f5f9] dark:bg-[#23272e] text-[#1e293b] dark:text-[#e0e7ef] focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 dark:placeholder-gray-500"
            autoComplete="username"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="px-3 py-2 border-2 border-black rounded bg-[#f1f5f9] dark:bg-[#23272e] text-[#1e293b] dark:text-[#e0e7ef] focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 dark:placeholder-gray-500"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            disabled={loading}
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 mt-2 border-2 border-[#2563eb] font-semibold rounded bg-yellow-200 hover:bg-yellow-300 text-[#1e293b] dark:bg-yellow-300 dark:text-[#23272e] dark:hover:bg-yellow-200 transition-colors duration-150 shadow-md focus:ring-2 focus:ring-[#2563eb] focus:outline-none flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (mode === 'login' ? 'Logging in...' : 'Signing up...') : (mode === 'login' ? 'Login' : 'Sign Up')}
          </button>
        </form>
        <div className="flex justify-between items-center mt-4">
          <button
            className="text-sm text-blue-700 dark:text-blue-300 hover:underline focus:outline-none"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            disabled={loading}
          >
            {mode === 'login' ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>
        </div>
        <div className="mt-6 flex flex-col items-center w-full">
          <span className="text-gray-500 text-xs mb-2">or</span>
          <button
            className="w-full flex items-center justify-center gap-3 border-2 border-black font-semibold rounded bg-white hover:bg-gray-100 text-[#1e293b] shadow-md transition-colors duration-150 py-2 mb-3"
            style={{ minHeight: '44px' }}
            disabled={loading}
            onClick={() => alert('Google login coming soon!')}
            type="button"
          >
            <img src="/icons/google.png" alt="Google" style={{ width: 36, height: 36, objectFit: 'contain', marginRight: 4 }} />
            <span className="text-base font-semibold" style={{lineHeight: 1}}>Login with Google</span>
          </button>
          <button
            onClick={handleGuest}
            className="px-4 py-2 border-2 border-black font-semibold rounded bg-yellow-200 hover:bg-yellow-300 text-[#1e293b] shadow-md transition-colors duration-150 flex items-center gap-2 dark:bg-yellow-300 dark:text-[#23272e] dark:hover:bg-yellow-200 w-full justify-center"
            disabled={loading}
          >
            <img src="/icons/mariostar.svg" alt="Mario Star" className="w-5 h-5" />
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;

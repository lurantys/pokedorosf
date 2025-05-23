import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import Pokedex from './Pokedex';
import Badges from './Badges';
import TodoList from './TodoList';
import Timer from './Timer';
import AuthPage from './AuthPage';
import { auth, firebaseConfig } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import LoadingScreen from './LoadingScreen';
import PWAInstallPrompt from './PWAInstallPrompt';
import { getFirestore } from 'firebase/firestore';
import { setPersistence, browserLocalPersistence } from 'firebase/auth';

const POKEMON_SPRITES_URL = '/pokemonsprites.json';

// Initialize Firestore
const db = getFirestore();

// Configure Firebase Auth persistence
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });

function App() {
  // Timer state
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [originalWorkDuration, setOriginalWorkDuration] = useState(null);
  const [minutes, setMinutes] = useState(() => {
    const savedWorkDuration = localStorage.getItem('workDuration');
    return savedWorkDuration ? parseInt(savedWorkDuration) : 25;
  });
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState('Work Time');
  const [pokemonSprites, setPokemonSprites] = useState([]);
  const [currentPokemonInfo, setCurrentPokemonInfo] = useState({ name: '', sprite: '' });
  const [workDuration, setWorkDuration] = useState(() => {
    const savedWorkDuration = localStorage.getItem('workDuration');
    return savedWorkDuration ? parseInt(savedWorkDuration) : 25;
  });
  const [shortBreakDuration, setShortBreakDuration] = useState(() => {
    const savedShortBreak = localStorage.getItem('shortBreakDuration');
    return savedShortBreak ? parseInt(savedShortBreak) : 5;
  });
  const [longBreakDuration, setLongBreakDuration] = useState(() => {
    const savedLongBreak = localStorage.getItem('longBreakDuration');
    return savedLongBreak ? parseInt(savedLongBreak) : 10;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [hpPercentage, setHpPercentage] = useState(100);

  const timerRef = useRef();
  const levelUpSoundRef = useRef();
  const buttonSoundRef = useRef();
  const bgMusicRef = useRef();

  // New state for Pokedex
  const [isPokedexOpen, setIsPokedexOpen] = useState(false);
  const [pokedexData, setPokedexData] = useState(null);
  const pokemonDataCache = useRef(new Map());

  // New state for Badges
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const toggleBadges = useCallback(() => {
    setIsBadgesOpen(open => !open);
  }, []);

  // Todo List state
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [todoInput, setTodoInput] = useState('');
  const [removingIdx, setRemovingIdx] = useState(null);

  // Track completed work sessions for badges
  const [completedSessions, setCompletedSessions] = useState(() => {
    const saved = localStorage.getItem('completedSessions');
    return saved ? parseInt(saved) : 0;
  });

  // Add new state for sound controls
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem('isMuted') === 'true');
  const [musicVolume, setMusicVolume] = useState(() => {
    const saved = localStorage.getItem('musicVolume');
    return saved ? parseFloat(saved) : 0.1;
  });
  const [effectsVolume, setEffectsVolume] = useState(() => {
    const saved = localStorage.getItem('effectsVolume');
    return saved ? parseFloat(saved) : 0.5;
  });
  const [cryVolume, setCryVolume] = useState(() => {
    const saved = localStorage.getItem('cryVolume');
    return saved ? parseFloat(saved) : 0.5;
  });

  // New state for background music, selected once on component initialization
  const [currentBgMusic] = useState(() => {
    const initialMusic = Math.random() < 0.5 ? '/audio/music/background.mp3' : '/audio/music/bg2.mp3';
    console.log('Initial background music selected:', initialMusic);
    return initialMusic;
  });

  // New state for authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true); // New state for loading

  // Save settings whenever they change
  useEffect(() => {
    localStorage.setItem('workDuration', workDuration.toString());
    localStorage.setItem('shortBreakDuration', shortBreakDuration.toString());
    localStorage.setItem('longBreakDuration', longBreakDuration.toString());
  }, [workDuration, shortBreakDuration, longBreakDuration]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('completedSessions', completedSessions.toString());
  }, [completedSessions]);

  // Calculate owned badges based on completed sessions
  const ownedBadges = Array.from({length: 8}, (_, i) => i + 1).filter(badgeNum => completedSessions >= badgeNum * 10);

  // Fetch Pokémon sprites on mount - only once
  useEffect(() => {
    let isMounted = true;
    console.log('Fetching Pokemon sprites...');
    fetch(POKEMON_SPRITES_URL)
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        console.log('Received Pokemon sprites:', data);
        setPokemonSprites(data);
        if (data.length) {
          const randomPokemon = data[Math.floor(Math.random() * data.length)];
          console.log('Selected random Pokemon:', randomPokemon);
          setCurrentPokemonInfo(randomPokemon);
        }
      })
      .catch(error => console.error('Error fetching sprites:', error));

    return () => {
      isMounted = false;
    };
  }, []);

  // Set dark mode on mount and update html class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft !== null) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleTimerEnd();
            return 0;
          }
          // Update HP percentage
          const totalTime = isBreakTime 
            ? (shortBreakDuration * 60)
            : (workDuration * 60);
          const newHpPercentage = Math.max(0, Math.min(100, (prev / totalTime) * 100));
          setHpPercentage(newHpPercentage);
          
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [isRunning, timeLeft, isBreakTime, shortBreakDuration, workDuration]);

  // Update minutes and seconds display
  useEffect(() => {
    if (timeLeft !== null) {
      setMinutes(Math.floor(timeLeft / 60));
      setSeconds(timeLeft % 60);
    }
  }, [timeLeft]);

  // Update session count and date when a session is completed
  const handleTimerEnd = () => {
    playLevelUpSound();
    // Send desktop notification
    sendTimerNotification(isBreakTime ? 'Work' : 'Break');
    setIsBreakTime(prev => !prev);
    if (!isBreakTime) {
      // Start break
      setStatus('Break Time');
      setTimeLeft(shortBreakDuration * 60);
      document.querySelector('.timer')?.classList.add('break-time');
      setCompletedSessions(prev => prev + 1);
    } else {
      // Start work
      setStatus('Work Time');
      setTimeLeft(workDuration * 60);
      setMinutes(workDuration);
      document.querySelector('.timer')?.classList.remove('break-time');
    }
    setIsRunning(true);
    setHpPercentage(100);
    // Change Pokémon sprite on each cycle
    if (pokemonSprites.length) {
      setCurrentPokemonInfo(pokemonSprites[Math.floor(Math.random() * pokemonSprites.length)]);
    }
  };

  const startTimer = () => {
    if (!isRunning) {
      // Request notification permission on first timer start
      if (timeLeft === null) {
        requestNotificationPermission();
      }
      setIsRunning(true);
      if (timeLeft === null) {
        const duration = isBreakTime ? shortBreakDuration : workDuration;
        setTimeLeft(duration * 60);
        setHpPercentage(100);
      }
    } else {
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(null);
    setIsBreakTime(false);
    setMinutes(workDuration);
    setSeconds(0);
    setStatus('Work Time');
    setHpPercentage(100);
    document.querySelector('.timer')?.classList.remove('break-time');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(dm => {
      localStorage.setItem('darkMode', !dm);
      return !dm;
    });
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // Save sound settings whenever they change
  useEffect(() => {
    localStorage.setItem('isMuted', isMuted);
    localStorage.setItem('musicVolume', musicVolume);
    localStorage.setItem('effectsVolume', effectsVolume);
    localStorage.setItem('cryVolume', cryVolume);
  }, [isMuted, musicVolume, effectsVolume, cryVolume]);

  // Effect to handle background music volume and mute state
  useEffect(() => {
    const bgMusic = bgMusicRef.current;
    if (!bgMusic) return;

    bgMusic.volume = isMuted ? 0 : musicVolume;
    if (isMuted && !bgMusic.paused) {
      bgMusic.pause(); // Pause if muted and currently playing
    }
    // Note: Playback is initiated by the first document click listener
  }, [bgMusicRef, isMuted, musicVolume, currentBgMusic]);

  const playLevelUpSound = () => {
    const sound = levelUpSoundRef.current;
    if (!sound || isMuted) return;
    sound.currentTime = 0;
    sound.volume = effectsVolume;
    sound.play().catch(() => {});
  };

  const playButtonSound = () => {
    const sound = buttonSoundRef.current;
    if (!sound || isMuted) return;
    sound.currentTime = 0;
    sound.volume = effectsVolume;
    sound.play().catch(() => {});
  };

  const startBackgroundMusic = () => {
    const bgMusic = bgMusicRef.current;
    if (!bgMusic) return;

    // Attempt to play only if not muted AND is currently paused
    if (!isMuted && bgMusic.paused) {
      bgMusic.volume = musicVolume; // Ensure correct volume is set before playing
      bgMusic.play().catch(error => {
        console.log('Background music play prevented by browser policy.', error);
        // Log error but no need to do anything else here, as the click listener is once
      });
    } else if (isMuted && !bgMusic.paused) { // If muted and playing, pause it
      bgMusic.pause();
    }
  };

  // Start background music on first click
  useEffect(() => {
    const handler = () => startBackgroundMusic();
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [startBackgroundMusic]);

  // Fetch Pokémon details whenever currentPokemonInfo changes
  useEffect(() => {
    if (!currentPokemonInfo || !currentPokemonInfo.name || !currentPokemonInfo.sprite) {
      setPokedexData(null);
      return;
    }
    const fetchPokemonDetails = async () => {
      if (!currentPokemonInfo.name || currentPokemonInfo.name === 'Pokédoro' || currentPokemonInfo.name === 'Error') {
        setPokedexData(null);
        return;
      }
      const pokemonName = currentPokemonInfo.name.toLowerCase();
      try {
        setPokedexData(null); // Show loading state
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) throw new Error('Pokemon not found');
        const data = await response.json();
        const speciesResponse = await fetch(data.species.url);
        if (!speciesResponse.ok) throw new Error('Species data not found');
        const speciesData = await speciesResponse.json();
        const descriptionEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
        const description = descriptionEntry ? descriptionEntry.flavor_text.replace(/[\f\n\r]/g, ' ').trim() : 'No description available.';
        const abilities = data.abilities.map(ability => 
          ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)
        );
        const moves = data.moves.slice(0, 4).map(move => 
          move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1).replace('-', ' ')
        );
        const processedData = {
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          types: data.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)),
          abilities,
          moves,
          description,
          spriteUrl: currentPokemonInfo.sprite, // Use the animated sprite from our JSON
          weight: data.weight / 10,
          height: data.height / 10,
        };
        setPokedexData(processedData);
      } catch (error) {
        setPokedexData({ 
          name: currentPokemonInfo.name, 
          error: "Could not load details.",
          spriteUrl: currentPokemonInfo.sprite 
        });
      }
    };
    fetchPokemonDetails();
  }, [currentPokemonInfo]);
  //test
  // Add event listener for Pokedex data updates
  useEffect(() => {
    const handlePokedexDataUpdate = (event) => {
      setPokedexData(event.detail);
    };
    
    window.addEventListener('updatePokedexData', handlePokedexDataUpdate);
    return () => window.removeEventListener('updatePokedexData', handlePokedexDataUpdate);
  }, []);

  // Pokedex toggle function
  const togglePokedex = useCallback(() => {
    console.log('Toggling Pokedex, current state:', isPokedexOpen);
    setIsPokedexOpen(!isPokedexOpen);
  }, [isPokedexOpen]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }

  function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const j = day % 10, k = day % 100;
    const suffix = (j === 1 && k !== 11) ? "st" : (j === 2 && k !== 12) ? "nd" : (j === 3 && k !== 13) ? "rd" : "th";
    return `${day}${suffix} of ${month}`;
  }

  const addTodo = (e) => {
    e.preventDefault();
    if (todoInput.trim()) {
      setTodos([...todos, { text: todoInput.trim(), done: false, _justAdded: true }]);
      setTodoInput('');
      setTimeout(() => {
        setTodos(todos => todos.map((todo, i) => ({ ...todo, _justAdded: false })));
      }, 400);
    }
  };

  const toggleTodo = (idx) => {
    setTodos(todos => todos.map((todo, i) => i === idx ? { ...todo, done: !todo.done } : todo));
  };

  const removeTodo = (idx) => {
    setRemovingIdx(idx);
    setTimeout(() => {
      setTodos(todos => todos.filter((_, i) => i !== idx));
      setRemovingIdx(null);
    }, 300);
  };

  // Function to request notification permission
  const requestNotificationPermission = () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
    } else if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      });
    }
  };

  // Function to send a desktop notification
  const sendTimerNotification = (type) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const options = {
        body: type === 'Work' ? 'Work session ended! Time for a break!' : 'Break session ended! Time to get back to work!',
        icon: '/icons/pokeball.png' // You might want to add a small icon
      };
      new Notification(`PokeDoro: ${type} Session Ended!`, options);
    }
  };

  // Handler to play Pokémon cry (legacy) with error handling
  const playPokemonCry = () => {
    if (!currentPokemonInfo || !currentPokemonInfo.sprite || !pokemonSprites.length) return;
    const idx = pokemonSprites.findIndex(p => p.sprite === currentPokemonInfo.sprite);
    if (idx === -1) return;
    const pokemonId = idx + 1; // National Dex numbers are 1-based, no padding for legacy
    const cryUrl = `https://github.com/PokeAPI/cries/raw/refs/heads/main/cries/pokemon/legacy/${pokemonId}.ogg`;
    console.log('Attempting to play cry:', cryUrl);
    const audio = new window.Audio(cryUrl);
    audio.volume = isMuted ? 0 : cryVolume;
    audio.onerror = () => {
      console.error('Failed to load cry audio:', cryUrl);
    };
    audio.play().catch((err) => {
      console.error('Audio play failed:', err);
    });
  };

  // Listen for Firebase Auth state changes
  useEffect(() => {
    let isMounted = true;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!isMounted) return;
      console.log('Auth state changed:', user); // Debug log
      if (user) {
        setIsAuthenticated(true);
        // If it's a guest user, set the guest flag
        if (user.isAnonymous) {
          localStorage.setItem('pokedorosf_guest', 'true');
        }
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem('pokedorosf_guest');
      }
      setAuthLoading(false);
    });

    // Cleanup subscription
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // Handler for logging out
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('pokedorosf_guest');
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (authLoading) {
    return <LoadingScreen />;
  }

  // Check both Firebase auth and guest status
  const isGuest = localStorage.getItem('pokedorosf_guest') === 'true';
  if (!isGuest && !isAuthenticated) {
    return <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className={`
      min-h-screen flex flex-col items-center justify-center
      transition-colors duration-300 font-sans py-4 md:py-8
      w-full max-w-full
      ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}
    `} style={{ 
      minWidth: 0,
      minHeight: '1000px'
    }}>
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
      
      {/* Top-left clock/date container, styled like badges/pokedex */}
      <div
        className={`
          clock-container text-center relative border-4 border-black
          animate-fadein-left
          ${isDarkMode ? 'bg-[#1f2937] text-[#d1d5db]' : 'bg-[#f7fee7] text-[#374151]'}
        `}
        style={{
          position: 'fixed',
          top: '120px',
          left: 'max(8px, 3vw)',
          zIndex: 50,
          borderRadius: '0',
          boxShadow: isDarkMode
            ? 'inset -4px -4px 0 0 #2F4F4F, inset 4px 4px 0 0 #555555, 0 0 15px rgba(0, 0, 0, 0.4)'
            : 'inset -4px -4px 0 0 #8FBC8F, inset 4px 4px 0 0 #FFFFFF, 0 0 10px rgba(0, 0, 0, 0.3)',
          padding: 'min(22px, 4vw) min(38px, 6vw) min(18px, 3vw) min(32px, 5vw)',
          minWidth: '180px',
          minHeight: '70px',
          maxWidth: '90vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          pointerEvents: 'none',
        }}
      >
        <div style={{ fontSize: 'clamp(1.2rem, 4vw, 2.1rem)', fontWeight: 'bold', letterSpacing: '2px', lineHeight: 1, textAlign: 'center' }}>
          {formatTime(currentTime).split(' ')[0]}
        </div>
        <div style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', fontWeight: 'bold', marginTop: '-4px', marginBottom: '2px', textAlign: 'center' }}>
          {formatTime(currentTime).split(' ')[1]}
        </div>
        <div style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)', marginTop: '2px', letterSpacing: '1px', textAlign: 'center' }}>
          {formatDate(currentTime)}
        </div>
      </div>
      {/* Floating To-Do List Container below the clock/date, left-aligned */}
      <TodoList
        todos={todos}
        todoInput={todoInput}
        setTodoInput={setTodoInput}
        addTodo={addTodo}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
        removingIdx={removingIdx}
        isDarkMode={isDarkMode}
      />
      {/* Badges sliding component at the top right */}
      <Badges
        isOpen={isBadgesOpen}
        toggleBadges={toggleBadges}
        darkMode={isDarkMode}
        ownedBadges={ownedBadges}
        completedSessions={completedSessions}
        className="animate-fadein-right"
        style={{
          maxWidth: '95vw',
          width: 'min(95vw, 300px)',
          maxHeight: '60vh',
          minWidth: 0,
          overflowY: 'auto',
          padding: 'min(18px, 4vw) min(8px, 2vw)',
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
        }}
      />
      {/* Large centered logo at the top of the page */}
      <img 
        src="/icons/logo.png" 
        alt="PokeDoro Logo" 
        className="mx-auto block mb-8 w-44 md:w-64 h-auto absolute top-4 md:top-8 animate-fadein-top"
        style={{ maxWidth: '80vw' }}
      />
      {/* Main content: timer, etc. */}
      <div className="container flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 max-w-3xl w-full px-2 md:px-4 mt-8 animate-fadein-center" style={{minWidth: 0}}>
        <div className="header flex flex-col items-center">
          <img
            className="sprite w-40 md:w-64 h-40 md:h-64 object-contain cursor-pointer"
            alt="Random Pokemon"
            src={currentPokemonInfo.sprite}
            style={{ imageRendering: 'pixelated', maxWidth: '60vw', height: 'auto' }}
            onClick={() => {
              playPokemonCry();
              if (currentPokemonInfo.sprite) togglePokedex();
            }}
            title="Click to play cry and open Pokédex"
          />
        </div>
        {/* Timer Container */}
        <Timer
          isDarkMode={isDarkMode}
          isBreakTime={isBreakTime}
          status={status}
          hpPercentage={hpPercentage}
          minutes={minutes}
          seconds={seconds}
          isRunning={isRunning}
          showSettings={showSettings}
          workDuration={workDuration}
          shortBreakDuration={shortBreakDuration}
          longBreakDuration={longBreakDuration}
          isMuted={isMuted}
          musicVolume={musicVolume}
          effectsVolume={effectsVolume}
          cryVolume={cryVolume}
          setWorkDuration={setWorkDuration}
          setShortBreakDuration={setShortBreakDuration}
          setLongBreakDuration={setLongBreakDuration}
          setIsMuted={setIsMuted}
          setMusicVolume={setMusicVolume}
          setEffectsVolume={setEffectsVolume}
          setCryVolume={setCryVolume}
          setMinutes={setMinutes}
          setTimeLeft={setTimeLeft}
          startTimer={startTimer}
          resetTimer={resetTimer}
          toggleDarkMode={toggleDarkMode}
          toggleSettings={toggleSettings}
          playButtonSound={playButtonSound}
          handleLogout={handleLogout}
        />
      </div>
      {/* Render Pokedex only after sprite is loaded */}
      {currentPokemonInfo.sprite && (
        <Pokedex
          isOpen={isPokedexOpen}
          togglePokedex={togglePokedex}
          pokemonSpriteUrl={currentPokemonInfo.sprite}
          pokedexData={pokedexData}
          darkMode={isDarkMode}
          style={{
            maxWidth: '95vw',
            width: 'min(95vw, 300px)',
            maxHeight: '60vh',
            minWidth: 0,
            overflowY: 'auto',
            padding: 'min(18px, 4vw) min(8px, 2vw)',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          }}
        />
      )}
      {/* Global footer */}
      <footer className="global-footer animate-fadein-bottom">
        @lurantys | sf summer 2025
      </footer>
      <audio ref={levelUpSoundRef} src="/audio/levelup.mp3" preload="auto" />
      <audio ref={buttonSoundRef} src="/audio/button.mp3" preload="auto" />
      {/* Background Music Audio element */}
      <audio ref={bgMusicRef} src={currentBgMusic} loop preload="auto" />
    </div>
  );
}
export default App;

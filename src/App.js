import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import Pokedex from './Pokedex'; // Import the Pokedex component
import Badges from './Badges'; // Import the Badges component

const POKEMON_SPRITES_URL = '/pokemonsprites.json';

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

  // New state for background music, selected once on component initialization
  const [currentBgMusic, setCurrentBgMusic] = useState(() => {
    const initialMusic = Math.random() < 0.5 ? '/audio/music/background.mp3' : '/audio/music/bg2.mp3';
    console.log('Initial background music selected:', initialMusic);
    return initialMusic;
  });

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

  // Fetch Pokémon sprites on mount
  useEffect(() => {
    console.log('Fetching Pokemon sprites...');
    fetch(POKEMON_SPRITES_URL)
      .then(res => res.json())
      .then(data => {
        console.log('Received Pokemon sprites:', data);
        setPokemonSprites(data);
        if (data.length) {
          const randomPokemon = data[Math.floor(Math.random() * data.length)];
          console.log('Selected random Pokemon:', randomPokemon);
          setCurrentPokemonInfo(randomPokemon);
        }
      })
      .catch(error => console.error('Error fetching sprites:', error));
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
      setCompletedSessions(prev => prev + 1); // Only increment after work session
    } else {
      // Start work
      setStatus('Work Time');
      setTimeLeft(workDuration * 60);
      setMinutes(workDuration);
      document.querySelector('.timer')?.classList.remove('break-time');
    }
    setIsRunning(true);
    setHpPercentage(100); // Reset HP at the end of each cycle
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
  }, [isMuted, musicVolume, effectsVolume]);

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

  return (
    <div className={`
      min-h-screen flex flex-col items-center justify-center
      transition-colors duration-300 font-sans py-4 md:py-8
      w-full max-w-full
      ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}
    `} style={{ minWidth: 0 }}>
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
      <div
        className={`
          todo-list-fixed
          animate-fadein-left
          ${isDarkMode ? 'text-[#d1d5db]' : 'text-[#374151]'}
        `}
        style={{
          position: 'fixed',
          top: '320px',
          left: 'max(8px, 3vw)',
          zIndex: 49,
          width: 'min(95vw, 300px)',
          height: 'min(60vw, 420px)',
          maxHeight: '70vh',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s cubic-bezier(.4,2,.6,1)',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.025)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <div className={`
          todo-list w-full h-full text-center border-4 border-black p-4 bg-opacity-100 flex flex-col
          ${isDarkMode 
            ? 'bg-[#1f2937] text-[#d1d5db]'
            : 'bg-[#f7fee7] text-[#374151]'}
        `}
        style={{
          boxShadow: isDarkMode
            ? 'inset -4px -4px 0 0 #2F4F4F, inset 4px 4px 0 0 #555555, 0 0 15px rgba(0, 0, 0, 0.4)'
            : 'inset -4px -4px 0 0 #8FBC8F, inset 4px 4px 0 0 #FFFFFF, 0 0 10px rgba(0, 0, 0, 0.3)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div className="text-lg font-semibold mb-3">Tasks</div>
          <form onSubmit={addTodo} className="flex gap-2 mb-4" style={{flexShrink: 0}}>
            <input
              type="text"
              value={todoInput}
              onChange={e => setTodoInput(e.target.value)}
              placeholder="Add a task..."
              className={`flex-1 px-2 py-1 border rounded ${isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
              maxLength={60}
              style={{minWidth: 0}}
            />
            <button
              type="submit"
              className={`px-3 py-1 border-2 border-black font-medium transition-transform duration-200 transform hover:-translate-y-0.5 hover:shadow-md ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
              style={{whiteSpace: 'nowrap'}}
            >
              Add
            </button>
          </form>
          <ul className="flex-1 overflow-y-auto max-h-full text-left pr-1" style={{minHeight: 0}}>
            {todos.length === 0 && (
              <li
                className="text-gray-400 text-center"
                style={{width: '100%', marginTop: '1.5rem'}}
              >
                <div style={{fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', marginBottom: '0.5em'}}>No tasks yet!</div>
                <span
                  aria-label="Mario Star"
                  style={{
                    display: 'inline-block',
                    width: '2.5em',
                    height: '2.5em',
                  }}
                >
                  <img src="/icons/mariostar.svg" alt="Mario Star" style={{ width: '100%', height: '100%' }} />
                </span>
              </li>
            )}
            {todos.map((todo, idx) => (
              <li
                key={idx}
                className={`flex items-center justify-between py-1 group ${removingIdx === idx ? 'todo-fade-out' : todo._justAdded ? 'todo-fade' : ''}`}
              >
                <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(idx)}
                    className="accent-green-500 w-4 h-4"
                  />
                  <span className={`flex-1 truncate ${todo.done ? 'line-through text-gray-400' : ''}`}>{todo.text}</span>
                </label>
                <button
                  onClick={() => removeTodo(idx)}
                  className="ml-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove"
                  type="button"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
            onClick={() => { if (currentPokemonInfo.sprite) togglePokedex(); }}
            title="Click to open Pokédex"
          />
        </div>
        {/* Timer Container */}
        <div className="flex flex-col items-center gap-4 md:gap-6 w-full max-w-md">
          <div className={`
            timer w-full max-w-md text-center relative border-4 border-black p-4 md:p-6 bg-opacity-100
            ${isDarkMode 
              ? 'bg-[#1f2937] text-[#d1d5db]'
              : 'bg-[#f7fee7] text-[#374151]'}
            ${isBreakTime 
              ? (isDarkMode ? 'border-green-500' : 'border-green-500') 
              : ''}
          `}
          style={{
            boxShadow: isDarkMode
              ? 'inset -4px -4px 0 0 #2F4F4F, inset 4px 4px 0 0 #555555, 0 0 15px rgba(0, 0, 0, 0.4)'
              : 'inset -4px -4px 0 0 #8FBC8F, inset 4px 4px 0 0 #FFFFFF, 0 0 10px rgba(0, 0, 0, 0.3)',
            minWidth: 0,
          }}>
            <div className={`
              absolute w-2 h-2 bottom-0 right-0 
              bg-black transform translate-x-1 translate-y-1
            `}></div>
            
            <div id="status" className={`
              text-lg font-semibold mb-3
              ${isBreakTime ? 'text-green-500' : ''}
            `}>
              {status}
            </div>
            
            {/* HP Bar */}
            <div className="hp-bar-container mb-4 flex items-center">
              <div className="hp-label font-bold mr-2">HP</div>
              <div className="hp-bar-wrapper flex-1 border-2 border-black bg-gray-200 h-4">
                <div 
                  className="hp-remaining h-full"
                  style={{
                    width: `${hpPercentage}%`,
                    backgroundColor: `hsl(${hpPercentage * 1.2}, 70%, 40%)`,
                  }}
                ></div>
              </div>
            </div>
            
            <div className={`
              time bg-gray-100 py-3 px-4 mb-4 text-center
              ${isDarkMode ? 'bg-gray-800' : ''}
            `}
            style={{
              marginBottom: '1rem',
              ...(isDarkMode ? { backgroundColor: '#1f2937' } : { backgroundColor: '#f7fee7' })
            }}>
              <span id="time-display" className="flex items-center justify-center gap-1 text-4xl">
                <span id="minutes" className={`
                  font-mono font-bold
                  ${isBreakTime ? 'text-green-600' : ''}
                  ${isDarkMode && !isBreakTime ? 'text-gray-100' : (!isDarkMode && !isBreakTime ? 'text-gray-900' : '')}
                `}>
                  {minutes.toString().padStart(2, '0')}
                </span>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>:</span>
                <span id="seconds" className={`
                  font-mono font-bold
                  ${isBreakTime ? 'text-green-600' : ''}
                  ${isDarkMode && !isBreakTime ? 'text-gray-100' : (!isDarkMode && !isBreakTime ? 'text-gray-900' : '')}
                `}>
                  {seconds.toString().padStart(2, '0')}
                </span>
              </span>
            </div>
            {/* --- RESTORED BUTTONS AND SETTINGS --- */}
            <div className="flex flex-col gap-2">
              <button 
                id="start-btn" 
                onClick={() => {playButtonSound();startTimer();}}
                className={`
                  px-4 py-2 border-2 border-black font-medium transition-transform duration-200
                  transform hover:-translate-y-0.5 hover:shadow-md
                  ${isDarkMode 
                    ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}
                `}
                style={{
                  boxShadow: isDarkMode
                    ? 'inset -4px -4px 0 0 #2F4F4F, inset 4px 4px 0 0 #555555, 0 0 15px rgba(0, 0, 0, 0.4)'
                    : 'inset -4px -4px 0 0 #8FBC8F, inset 4px 4px 0 0 #FFFFFF, 0 0 10px rgba(0, 0, 0, 0.3)'
                }}
              >
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <button 
                onClick={() => {playButtonSound();resetTimer();}}
                className={`
                  px-4 py-2 border-2 border-black font-medium transition-transform duration-200
                  transform hover:-translate-y-0.5 hover:shadow-md
                  ${isDarkMode 
                    ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}
                `}
                style={{
                  boxShadow: isDarkMode
                    ? 'inset -4px -4px 0 0 #2F4F4F, inset 4px 4px 0 0 #555555, 0 0 15px rgba(0, 0, 0, 0.4)'
                    : 'inset -4px -4px 0 0 #8FBC8F, inset 4px 4px 0 0 #FFFFFF, 0 0 10px rgba(0, 0, 0, 0.3)'
                }}
              >
                Reset
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={() => {playButtonSound();toggleDarkMode();}}
                  className={`
                    flex-1 px-4 py-2 border-2 border-black font-medium transition-transform duration-200
                    transform hover:-translate-y-0.5 hover:shadow-md
                    ${isDarkMode 
                      ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}
                  `}
                  style={{
                    boxShadow: isDarkMode
                      ? 'inset -4px -4px 0 0 #2F4F4F, inset 4px 4px 0 0 #555555, 0 0 15px rgba(0, 0, 0, 0.4)'
                      : 'inset -4px -4px 0 0 #8FBC8F, inset 4px 4px 0 0 #FFFFFF, 0 0 10px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  Theme
                </button>
                <button 
                  onClick={() => {playButtonSound();toggleSettings();}}
                  className={`
                    flex-1 px-4 py-2 border-2 border-black font-medium transition-transform duration-200
                    transform hover:-translate-y-0.5 hover:shadow-md
                    ${isDarkMode 
                      ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}
                  `}
                  style={{
                    boxShadow: isDarkMode
                      ? 'inset -4px -4px 0 0 #2F4F4F, inset 4px 4px 0 0 #555555, 0 0 15px rgba(0, 0, 0, 0.4)'
                      : 'inset -4px -4px 0 0 #8FBC8F, inset 4px 4px 0 0 #FFFFFF, 0 0 10px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  Settings
                </button>
              </div>
            </div>
            <div
              className={`
                settings mt-4 pt-4 border-t-2 
                ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}
                settings-animated
              `}
              style={{
                maxHeight: showSettings ? '300px' : '0',
                opacity: showSettings ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease'
              }}
              aria-hidden={!showSettings}
            >
              <div
                className="flex flex-col gap-2 text-left text-sm settings-scroll"
                style={{
                  pointerEvents: showSettings ? 'auto' : 'none',
                  opacity: showSettings ? 1 : 0,
                  transition: 'opacity 0.3s',
                  maxHeight: '220px',
                  overflowY: 'auto',
                  paddingRight: '8px',
                }}
              >
                <label className="flex items-center justify-between">
                  <span>Work Time:</span>
                  <input 
                    type="number" 
                    value={workDuration}
                    min="1" 
                    max="60"
                    onChange={(e) => {
                      const newDuration = Number(e.target.value);
                      setWorkDuration(newDuration);
                      if (!isRunning && !isBreakTime) {
                        setMinutes(newDuration);
                        setTimeLeft(newDuration * 60);
                      }
                    }}
                    className={`
                      w-16 px-2 py-1 border 
                      ${isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-gray-100' 
                        : 'bg-white border-gray-300 text-gray-900'}
                    `}
                  /> min
                </label>
                <label className="flex items-center justify-between">
                  <span>Short Break:</span>
                  <input 
                    type="number" 
                    value={shortBreakDuration}
                    min="1" 
                    max="30"
                    onChange={(e) => {
                      const newDuration = Number(e.target.value);
                      setShortBreakDuration(newDuration);
                      if (!isRunning && isBreakTime) {
                        setMinutes(newDuration);
                        setTimeLeft(newDuration * 60);
                      }
                    }}
                    className={`
                      w-16 px-2 py-1 border 
                      ${isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-gray-100' 
                        : 'bg-white border-gray-300 text-gray-900'}
                    `}
                  /> min
                </label>
                <label className="flex items-center justify-between">
                  <span>Long Break:</span>
                  <input 
                    type="number" 
                    value={longBreakDuration}
                    min="1" 
                    max="60"
                    onChange={(e) => {
                      const newDuration = Number(e.target.value);
                      setLongBreakDuration(newDuration);
                    }}
                    className={`
                      w-16 px-2 py-1 border 
                      ${isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-gray-100' 
                        : 'bg-white border-gray-300 text-gray-900'}
                    `}
                  /> min
                </label>
                <div className="mt-4 mb-2 font-semibold">Sound Settings</div>
                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={isMuted}
                    onChange={e => setIsMuted(e.target.checked)}
                  />
                  <span>Mute All Sounds</span>
                </label>
                <label className="flex items-center justify-between mb-2 gap-2">
                  <span style={{ minWidth: '90px' }}>Music Volume:</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={musicVolume}
                    disabled={isMuted}
                    onChange={e => setMusicVolume(parseFloat(e.target.value))}
                    style={{ width: '120px', flex: 1 }}
                  />
                  <span style={{ width: '32px', textAlign: 'right' }}>{Math.round(musicVolume * 100)}</span>
                </label>
                <label className="flex items-center justify-between mb-2 gap-2">
                  <span style={{ minWidth: '90px' }}>Effects Volume:</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={effectsVolume}
                    disabled={isMuted}
                    onChange={e => setEffectsVolume(parseFloat(e.target.value))}
                    style={{ width: '120px', flex: 1 }}
                  />
                  <span style={{ width: '32px', textAlign: 'right' }}>{Math.round(effectsVolume * 100)}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio ref={levelUpSoundRef} src="/audio/levelup.mp3" preload="auto" />
      <audio ref={buttonSoundRef} src="/audio/button.mp3" preload="auto" />
      {/* Background Music Audio element */}
      <audio ref={bgMusicRef} src={currentBgMusic} loop preload="auto" />
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
    </div>
  );
}

export default App;

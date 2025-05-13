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

  // Save settings whenever they change
  useEffect(() => {
    localStorage.setItem('workDuration', workDuration.toString());
    localStorage.setItem('shortBreakDuration', shortBreakDuration.toString());
    localStorage.setItem('longBreakDuration', longBreakDuration.toString());
  }, [workDuration, shortBreakDuration, longBreakDuration]);

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
    setIsBreakTime(prev => !prev);
    if (!isBreakTime) {
      // Start break
      setStatus('Break Time');
      setTimeLeft(shortBreakDuration * 60);
      document.querySelector('.timer')?.classList.add('break-time');
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

  const playLevelUpSound = () => {
    const sound = levelUpSoundRef.current;
    if (!sound) return;
    sound.currentTime = 0;
    sound.volume = 0.5;
    sound.play().catch(() => {});
  };

  const playButtonSound = () => {
    const sound = buttonSoundRef.current;
    if (!sound) return;
    sound.currentTime = 0;
    sound.volume = 0.3;
    sound.play().catch(() => {});
  };

  const startBackgroundMusic = () => {
    const bgMusic = bgMusicRef.current;
    if (!bgMusic) return;
    bgMusic.volume = 0.1;
    bgMusic.play().catch(() => {});
  };

  // Start background music on first click
  useEffect(() => {
    const handler = () => startBackgroundMusic();
    document.addEventListener('click', handler, { once: true });
    return () => document.removeEventListener('click', handler);
  }, []);

  // Fetch Pokémon details whenever currentPokemonInfo changes
  useEffect(() => {
    console.log('currentPokemonInfo changed:', currentPokemonInfo);
    const fetchPokemonDetails = async () => {
      if (!currentPokemonInfo.name || currentPokemonInfo.name === 'Pokédoro' || currentPokemonInfo.name === 'Error') {
        console.log('No valid Pokemon to fetch details for');
        return;
      }

      const pokemonName = currentPokemonInfo.name.toLowerCase();
      console.log('Fetching details for:', pokemonName);
      try {
        setPokedexData(null); // Show loading state
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) throw new Error('Pokemon not found');
        const data = await response.json();
        console.log('Received Pokemon data:', data);

        const speciesResponse = await fetch(data.species.url);
        if (!speciesResponse.ok) throw new Error('Species data not found');
        const speciesData = await speciesResponse.json();
        console.log('Received species data:', speciesData);

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

        console.log('Setting processed Pokemon data:', processedData);
        setPokedexData(processedData);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
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

  return (
    <div className={`
      min-h-screen flex flex-col items-center justify-center
      transition-colors duration-300 font-sans py-8
      ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} {/* Changed dark mode background to gray-700 */}
    `}>
      {/* Top-left clock/date container, styled like badges/pokedex */}
      <div
        className={`
          clock-container text-center relative border-4 border-black
          ${isDarkMode ? 'bg-[#1f2937] text-[#d1d5db]' : 'bg-[#f7fee7] text-[#374151]'}
        `}
        style={{
          position: 'fixed',
          top: '120px', // Just under the logo
          left: '40px',
          zIndex: 50,
          borderRadius: '0',
          boxShadow: isDarkMode
            ? 'inset -4px -4px 0 0 #2F4F4F, inset 4px 4px 0 0 #555555, 0 0 15px rgba(0, 0, 0, 0.4)'
            : 'inset -4px -4px 0 0 #8FBC8F, inset 4px 4px 0 0 #FFFFFF, 0 0 10px rgba(0, 0, 0, 0.3)',
          padding: '22px 38px 18px 32px',
          minWidth: '230px',
          minHeight: '90px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem',
          pointerEvents: 'none',
        }}
      >
        <div style={{ fontSize: '2.1rem', fontWeight: 'bold', letterSpacing: '2px', lineHeight: 1, textAlign: 'center' }}>
          {formatTime(currentTime).split(' ')[0]}
        </div>
        <div style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '-4px', marginBottom: '2px', textAlign: 'center' }}>
          {formatTime(currentTime).split(' ')[1]}
        </div>
        <div style={{ fontSize: '1.1rem', marginTop: '2px', letterSpacing: '1px', textAlign: 'center' }}>
          {formatDate(currentTime)}
        </div>
      </div>
      {/* Badges sliding component at the top right */}
      <Badges
        isOpen={isBadgesOpen}
        toggleBadges={toggleBadges}
        darkMode={isDarkMode}
      />
      {/* Large centered logo at the top of the page */}
      <img 
        src="/icons/logo.png" 
        alt="PokeDoro Logo" 
        className="mx-auto block mb-8 w-64 h-auto absolute top-8"
        style={{ maxWidth: '80vw' }}
      />
      
      <div className="container flex flex-col md:flex-row items-center justify-center gap-6 max-w-3xl px-4 mt-32">
        <div className="header flex flex-col items-center">
          <img
            className="sprite w-64 h-64 object-contain"
            alt="Random Pokemon"
            src={currentPokemonInfo.sprite}
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        
        <div className={`
          timer w-96 text-center relative border-4 border-black p-6 bg-opacity-100
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
            : 'inset -4px -4px 0 0 #8FBC8F, inset 4px 4px 0 0 #FFFFFF, 0 0 10px rgba(0, 0, 0, 0.3)'
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
                className={`hp-remaining h-full ${hpPercentage > 50 ? 'bg-green-500' : hpPercentage > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${hpPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className={`
            time bg-gray-100 py-3 px-4 mb-4 text-center border border-gray-300
            ${isDarkMode ? 'bg-gray-800 border-gray-600' : ''}
          `}>
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
              className="flex flex-col gap-2 text-left text-sm"
              style={{
                pointerEvents: showSettings ? 'auto' : 'none',
                opacity: showSettings ? 1 : 0,
                transition: 'opacity 0.3s'
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
            </div>
          </div>
        </div>
      </div>

      <audio ref={levelUpSoundRef} src="/audio/levelup.mp3" preload="auto" />
      <audio ref={buttonSoundRef} src="/audio/button.mp3" preload="auto" />
      <audio ref={bgMusicRef} src="/audio/background.mp3" loop preload="auto" />

      {/* Render Pokedex only after sprite is loaded */}
      {currentPokemonInfo.sprite && (
        <Pokedex
          isOpen={isPokedexOpen}
          togglePokedex={togglePokedex}
          pokemonSpriteUrl={currentPokemonInfo.sprite}
          pokedexData={pokedexData}
          darkMode={isDarkMode}
        />
      )}
      {/* Global footer */}
      <footer className="global-footer">
        @lurantys | sf summer 2025
      </footer>
    </div>
  );
}

export default App;

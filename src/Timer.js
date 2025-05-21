import React from 'react';

function Timer({
  isDarkMode,
  isBreakTime,
  status,
  hpPercentage,
  minutes,
  seconds,
  isRunning,
  showSettings,
  workDuration,
  shortBreakDuration,
  longBreakDuration,
  isMuted,
  musicVolume,
  effectsVolume,
  cryVolume,
  setWorkDuration,
  setShortBreakDuration,
  setLongBreakDuration,
  setIsMuted,
  setMusicVolume,
  setEffectsVolume,
  setCryVolume,
  setMinutes,
  setTimeLeft,
  startTimer,
  resetTimer,
  toggleDarkMode,
  toggleSettings,
  playButtonSound,
  isBreak,
  isRunningState
}) {
  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 w-full max-w-md">
      <div className={
        `timer w-full max-w-md text-center relative border-4 border-black p-4 md:p-6 bg-opacity-100 ` +
        (isDarkMode ? 'bg-[#1f2937] text-[#d1d5db]' : 'bg-[#f7fee7] text-[#374151]') +
        (isBreakTime ? (isDarkMode ? ' border-green-500' : ' border-green-500') : '')
      }
      style={{
        boxShadow: isDarkMode
          ? 'inset -4px -4px 0 0 #2F4F4F, inset 4px 4px 0 0 #555555, 0 0 15px rgba(0, 0, 0, 0.4)'
          : 'inset -4px -4px 0 0 #8FBC8F, inset 4px 4px 0 0 #FFFFFF, 0 0 10px rgba(0, 0, 0, 0.3)',
        minWidth: 0,
      }}>
        <div className="absolute w-2 h-2 bottom-0 right-0 bg-black transform translate-x-1 translate-y-1"></div>
        <div id="status" className={`text-lg font-semibold mb-3 ${isBreakTime ? 'text-green-500' : ''}`}>
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
        <div className={
          `time bg-gray-100 py-3 px-4 mb-4 text-center ` +
          (isDarkMode ? 'bg-gray-800' : '')
        }
        style={{
          marginBottom: '1rem',
          ...(isDarkMode ? { backgroundColor: '#1f2937' } : { backgroundColor: '#f7fee7' })
        }}>
          <span id="time-display" className="flex items-center justify-center gap-1 text-4xl">
            <span id="minutes" className={
              `font-mono font-bold ` +
              (isBreakTime ? 'text-green-600' : '') +
              (isDarkMode && !isBreakTime ? ' text-gray-100' : (!isDarkMode && !isBreakTime ? ' text-gray-900' : ''))
            }>
              {minutes.toString().padStart(2, '0')}
            </span>
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>:</span>
            <span id="seconds" className={
              `font-mono font-bold ` +
              (isBreakTime ? 'text-green-600' : '') +
              (isDarkMode && !isBreakTime ? ' text-gray-100' : (!isDarkMode && !isBreakTime ? ' text-gray-900' : ''))
            }>
              {seconds.toString().padStart(2, '0')}
            </span>
          </span>
        </div>
        {/* --- BUTTONS AND SETTINGS --- */}
        <div className="flex flex-col gap-2">
          <button 
            id="start-btn" 
            onClick={() => {playButtonSound();startTimer();}}
            className={
              `px-4 py-2 border-2 border-black font-medium transition-transform duration-200 ` +
              `transform hover:-translate-y-0.5 hover:shadow-md ` +
              (isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900')
            }
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
            className={
              `px-4 py-2 border-2 border-black font-medium transition-transform duration-200 ` +
              `transform hover:-translate-y-0.5 hover:shadow-md ` +
              (isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900')
            }
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
              className={
                `flex-1 px-4 py-2 border-2 border-black font-medium transition-transform duration-200 ` +
                `transform hover:-translate-y-0.5 hover:shadow-md ` +
                (isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900')
              }
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
              className={
                `flex-1 px-4 py-2 border-2 border-black font-medium transition-transform duration-200 ` +
                `transform hover:-translate-y-0.5 hover:shadow-md ` +
                (isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900')
              }
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
        {/* Settings Panel */}
        <div
          className={
            `settings mt-4 pt-4 border-t-2 ` +
            (isDarkMode ? 'border-gray-600' : 'border-gray-300') +
            ' settings-animated'
          }
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
                className={
                  `w-16 px-2 py-1 border ` +
                  (isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900')
                }
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
                className={
                  `w-16 px-2 py-1 border ` +
                  (isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900')
                }
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
                className={
                  `w-16 px-2 py-1 border ` +
                  (isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900')
                }
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
            <label className="flex items-center justify-between mb-2 gap-2">
              <span style={{ minWidth: '90px' }}>Cry Volume:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={cryVolume}
                disabled={isMuted}
                onChange={e => setCryVolume(parseFloat(e.target.value))}
                style={{ width: '120px', flex: 1 }}
              />
              <span style={{ width: '32px', textAlign: 'right' }}>{Math.round(cryVolume * 100)}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;

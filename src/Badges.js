import React, { useEffect, useState } from 'react';

const Badges = ({ isOpen, toggleBadges, darkMode, ownedBadges = [], completedSessions = 0 }) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAnimationClass('animate-fadein-right');
    } else {
      setAnimationClass('');
    }
  }, [isOpen]);

  const containerClasses = `badges-container ${isOpen ? 'open' : 'closed'} ${darkMode ? 'dark' : ''} ${animationClass}`;
  const tabClasses = `badges-tab ${darkMode ? 'dark' : ''}`;
  const contentClasses = `badges-content ${darkMode ? 'dark' : ''}`;

  return (
    <div className={containerClasses}>
      <div 
        className={tabClasses} 
        onClick={toggleBadges} 
        role="button" 
        tabIndex={0} 
        aria-expanded={isOpen} 
        aria-label="Toggle Badges"
      >
        BADGES
      </div>
      <div className={contentClasses} style={{ width: '320px', height: '180px', overflow: 'hidden', padding: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', position: 'relative' }}>
        <div className="grid grid-cols-4 grid-rows-2 gap-4">
          {[1,2,3,4,5,6,7,8].map(num => {
            const owned = ownedBadges.includes(num);
            const threshold = num * 10;
            const progress = Math.min(completedSessions, threshold);
            return (
              <div key={num} className="relative flex flex-col items-center group">
                <img
                  src={`/icons/badge${num}.png`}
                  alt={`Badge ${num}`}
                  className={`w-12 h-12 object-contain transition-all duration-200
                    ${!owned ? 'grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100' : ''}
                  `}
                  style={{
                    filter: darkMode ? 'drop-shadow(0 0 2px #222)' : '',
                  }}
                  aria-label={owned ? `Unlocked Badge ${num}` : `Locked Badge ${num}`}
                />
                <span className={`absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs px-1 py-0.5 rounded pointer-events-none transition-opacity duration-200
                  ${owned ? 'bg-green-200 text-green-900 opacity-80' : 'bg-gray-300 text-gray-700 opacity-0 group-hover:opacity-100'}
                `}>
                  {owned ? 'Unlocked' : 'Locked'}<br/>
                  <span className="font-mono">{progress}/{threshold}</span>
                </span>
              </div>
            );
          })}
        </div>
        <div className="text-gray-500 text-center select-none w-full text-[10px]" style={{marginTop: '16px', marginBottom: '2px', fontSize: '12px'}}>
          Complete sessions to<br />earn gym badges !
        </div>
      </div>
    </div>
  );
};
export default Badges; 
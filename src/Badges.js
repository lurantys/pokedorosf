import React from 'react';

const Badges = ({ isOpen, toggleBadges, darkMode }) => {
  const containerClasses = `badges-container ${isOpen ? 'open' : 'closed'} ${darkMode ? 'dark' : ''}`;
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
      <div className={contentClasses}>
        {/* Badges content will go here */}
      </div>
    </div>
  );
};
export default Badges; 
// src/Pokedex.js
import React, { useEffect, useState } from 'react';

const Pokedex = ({ isOpen, togglePokedex, pokemonSpriteUrl, pokedexData, darkMode }) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAnimationClass('animate-fadein-right');
    } else {
      setAnimationClass('');
    }
  }, [isOpen]);

  const containerClasses = `pokedex-container ${isOpen ? 'open' : 'closed'} ${darkMode ? 'dark' : ''} ${animationClass}`;
  const tabClasses = `pokedex-tab ${darkMode ? 'dark' : ''}`;
  const contentClasses = `pokedex-content ${darkMode ? 'dark' : ''}`;

  let content;
  if (pokedexData && !pokedexData.error) {
    content = (
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0 text-center">
          {pokedexData.spriteUrl && (
            <img 
              src={pokedexData.spriteUrl}
              alt={pokedexData.name || 'Pokemon'} 
              className="w-24 h-24 mx-auto my-2 sprite"
            />
          )}
          <h3 className="text-lg font-bold mb-1">{pokedexData.name}</h3>
          
          {pokedexData.types && (
            <div className="flex justify-center gap-1 mb-2">
              {pokedexData.types.map((type, index) => (
                <span
                  key={index}
                  className={`px-2 py-0.5 text-xs rounded ${
                    darkMode
                      ? 'bg-gray-600 text-gray-100'
                      : 'bg-lime-100 text-gray-800'
                  }`}
                >
                  {type}
                </span>
              ))}
            </div>
          )}

          {(pokedexData.height !== undefined && pokedexData.weight !== undefined) && (
            <div className="text-xs flex justify-center gap-4 mb-2">
              <span>Height: {pokedexData.height}m</span>
              <span>Weight: {pokedexData.weight}kg</span>
            </div>
          )}
        </div>

        {pokedexData.stats && (
          <div className="text-xs mb-2">
            <strong className="block text-center">Stats:</strong>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {Object.entries(pokedexData.stats).map(([stat, value]) => (
                <div key={stat} className="flex items-center gap-1">
                  <span className="w-12 font-bold text-center">{stat.toUpperCase()}:</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${(value / 255) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {pokedexData.description && (
          <div className="text-xs">
            <strong className="block text-center">Description:</strong>
            <p className="mt-1 leading-relaxed text-center"> 
              {pokedexData.description}
            </p>
          </div>
        )}
      </div>
    );
  } else {
    content = (
      <div className="h-full flex items-center justify-center">
        <p className="text-center text-sm">
          Loading Pokémon data...
        </p>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div 
        className={tabClasses} 
        onClick={togglePokedex} 
        role="button" 
        tabIndex={0} 
        aria-expanded={isOpen} 
        aria-label="Toggle Pokedex"
      >
        POKEDEX
      </div>
      <div className={`${contentClasses} p-4`}>
        {content}
      </div>
    </div>
  );
};

export default Pokedex;

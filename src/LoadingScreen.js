import React from 'react';

function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#f7fee7] dark:bg-[#1f2937] transition-colors duration-300">
      <img 
        src="/icons/logo.png" 
        alt="PokeDoro Logo" 
        className="mx-auto block mb-8"
        style={{ 
          maxWidth: '250px', 
          width: 'min(70vw, 250px)', 
          height: 'auto', 
          imageRendering: 'pixelated',
        }} 
      />
      <div className="loader"></div> {/* Simple CSS loader - need to add styles */} 
      <p className="text-lg text-[#1e293b] dark:text-[#e0e7ef] mt-4">Loading...</p>
    </div>
  );
}

export default LoadingScreen; 
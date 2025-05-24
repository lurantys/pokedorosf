import React, { useState, useEffect, useRef } from 'react';

const SNAKE_SPEED = 180;
const TILE_SIZE = 15;
const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;
const GRID_WIDTH = CANVAS_WIDTH / TILE_SIZE;
const GRID_HEIGHT = CANVAS_HEIGHT / TILE_SIZE;

const animationStyles = {
  fadeIn: {
    animation: 'fadeIn 0.3s ease-in-out forwards',
  },
  fadeOut: {
    animation: 'fadeOut 0.3s ease-in-out forwards',
  },
  popIn: {
    animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
  },
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  '@keyframes fadeOut': {
    '0%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
  '@keyframes popIn': {
    '0%': { transform: 'translate(-50%, -50%) scale(0.9)', opacity: 0 },
    '100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
  }
};

function TodoList({
  todos,
  todoInput,
  setTodoInput,
  addTodo,
  toggleTodo,
  removeTodo,
  removingIdx,
  isDarkMode,
  currentStreak
}) {
  const [clickCount, setClickCount] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef(null);
  const eatSoundRef = useRef();
  const gameOverSoundRef = useRef();
  useEffect(() => {
    const styleId = 'game-animations';
    if (!document.getElementById(styleId)) {
      const styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.type = 'text/css';
      styleEl.innerHTML = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes popIn {
          0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        
        @keyframes popOut {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
        }
      `;
      document.head.appendChild(styleEl);
    }
    return () => {
      if (document.querySelectorAll('.game-container').length <= 1) {
        const styleEl = document.getElementById(styleId);
        if (styleEl) {
          document.head.removeChild(styleEl);
        }
      }
    };
  }, []);
  
  const gameRef = useRef({
    snake: [{ x: 5, y: 5 }],
    food: null,
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    togepiImg: null,
    gameLoop: null,
    isRunning: false
  });

  const handleGifClick = () => {
    if (clickCount === 4) {
      setClickCount(0);
      setShowGame(true);
      setScore(0);
      setGameOver(false);
    } else {
      setClickCount(clickCount + 1);
    }
  };
  const [isClosing, setIsClosing] = useState(false);

  const closeGame = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowGame(false);
      setIsClosing(false);
    }, 300);
  };
  const handleKeyPress = (event) => {
    if (event.key === ' ' && gameOver) {
      restartGame();
      return;
    }
    const { nextDirection, direction } = gameRef.current;
    switch (event.key) {
      case 'ArrowUp':
        if (direction.y !== 1) {
          gameRef.current.nextDirection = { x: 0, y: -1 };
        }
        break;
      case 'ArrowDown':
        if (direction.y !== -1) {
          gameRef.current.nextDirection = { x: 0, y: 1 };
        }
        break;
      case 'ArrowLeft':
        if (direction.x !== 1) {
          gameRef.current.nextDirection = { x: -1, y: 0 };
        }
        break;
      case 'ArrowRight':
        if (direction.x !== -1) {
          gameRef.current.nextDirection = { x: 1, y: 0 };
        }
        break;
    }
  };

  useEffect(() => {
    if (showGame && canvasRef.current) {
      gameRef.current.snake = [{ x: 5, y: 5 }];
      gameRef.current.direction = { x: 1, y: 0 };
      gameRef.current.nextDirection = { x: 1, y: 0 };
      gameRef.current.food = generateFood(gameRef.current.snake);
      gameRef.current.isRunning = true;
      setGameOver(false);
      setScore(0);
      const togepi = new Image();
      togepi.src = '/icons/togepi.png';
      gameRef.current.togepiImg = togepi;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      window.addEventListener('keydown', handleKeyPress);
      gameRef.current.gameLoop = setInterval(() => {
        if (gameRef.current.isRunning) {
          updateGame();
          drawGame(ctx, canvas);
        }
      }, SNAKE_SPEED);
      drawGame(ctx, canvas);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
        clearInterval(gameRef.current.gameLoop);
        gameRef.current.isRunning = false;
      };
    }
  }, [showGame]);

  const generateFood = (snake) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT)
      };
      let collisionWithSnake = false;
      for (const segment of snake) {
        if (segment.x === newFood.x && segment.y === newFood.y) {
          collisionWithSnake = true;
          break;
        }
      }
      if (!collisionWithSnake) {
        return newFood;
      }
    }
  };

  const updateGame = () => {
    const { snake, food, nextDirection } = gameRef.current;
    gameRef.current.direction = nextDirection;
    const head = {
      x: (snake[0].x + nextDirection.x + GRID_WIDTH) % GRID_WIDTH,
      y: (snake[0].y + nextDirection.y + GRID_HEIGHT) % GRID_HEIGHT
    };
    console.log('updateGame', { head, food });
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        console.log('Game over: snake collided with itself.');
        handleGameOver();
        return;
      }
    }
    snake.unshift(head);
    if (
      food &&
      Number.isInteger(head.x) && Number.isInteger(head.y) &&
      Number.isInteger(food.x) && Number.isInteger(food.y) &&
      head.x === food.x && head.y === food.y
    ) {
      console.log('Ate food!', { head, food, eatSoundRef: eatSoundRef.current });
      gameRef.current.food = generateFood(snake);
      setScore(prevScore => prevScore + 1);
      if (eatSoundRef.current) {
        eatSoundRef.current.currentTime = 0;
        eatSoundRef.current.volume = 1;
        eatSoundRef.current.play().catch((e) => console.log('Audio play error', e));
      }
    } else {
      snake.pop();
    }
  };

  const handleGameOver = () => {
    gameRef.current.isRunning = false;
    setGameOver(true);
    if (gameOverSoundRef.current) {
      gameOverSoundRef.current.currentTime = 0;
      gameOverSoundRef.current.play().catch(() => {});
    }
  };

  const restartGame = () => {
    gameRef.current.snake = [{ x: 5, y: 5 }];
    gameRef.current.direction = { x: 1, y: 0 };
    gameRef.current.nextDirection = { x: 1, y: 0 };
    gameRef.current.food = generateFood([{ x: 5, y: 5 }]);
    gameRef.current.isRunning = true;
    setGameOver(false);
    setScore(0);
  };
  const drawGame = (ctx, canvas) => {
    const { snake, food, togepiImg } = gameRef.current;
    ctx.fillStyle = isDarkMode ? '#1f2937' : '#f7fee7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = isDarkMode ? '#d1d5db' : '#374151';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
    ctx.fillStyle = '#8b5cf6';
    snake.forEach((segment, index) => {
      if (index === 0) {
        ctx.fillStyle = '#6d28d9';
      } else {
        ctx.fillStyle = '#8b5cf6';
      }
      ctx.fillRect(segment.x * TILE_SIZE, segment.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      ctx.strokeStyle = isDarkMode ? '#1a2e42' : '#d8b4fe';
      ctx.lineWidth = 1;
      ctx.strokeRect(segment.x * TILE_SIZE, segment.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    });
    if (food) {
      if (togepiImg && togepiImg.complete) {
        const togepiSize = TILE_SIZE * 3;
        const offsetX = (togepiSize - TILE_SIZE) / 2;
        const offsetY = (togepiSize - TILE_SIZE) / 2;
        ctx.drawImage(
          togepiImg, 
          (food.x * TILE_SIZE) - offsetX, 
          (food.y * TILE_SIZE) - offsetY, 
          togepiSize, 
          togepiSize
        );
      } else {
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(food.x * TILE_SIZE, food.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        ctx.strokeStyle = isDarkMode ? '#fecaca' : '#7f1d1d';
        ctx.lineWidth = 1;
        ctx.strokeRect(food.x * TILE_SIZE, food.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
    if (gameOver) {
      ctx.fillStyle = isDarkMode 
        ? 'rgba(0, 0, 0, 0.75)' 
        : 'rgba(0, 0, 0, 0.65)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 24);
      ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2);
      ctx.font = '16px Arial';
      ctx.fillText('Press Space to Restart', canvas.width / 2, canvas.height / 2 + 30);
    }
  };

  useEffect(() => {
    if (showGame) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showGame]);

  return (
    <>
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
          
          {/* Container for task list and empty state - takes up remaining space */}
          <div className="flex-1 overflow-y-auto text-left pr-1" style={{minHeight: '250px', flexGrow: 1, flexShrink: 0}}>
            <ul className="">
              {todos.length === 0 && (
                <li
                  className="text-gray-400 text-center"
                  style={{width: '100%', marginTop: '2.5rem'}}>
                  <div style={{fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', marginBottom: '0.5em'}}>No tasks yet!</div>
                  <span
                    aria-label="Pokemon GIF"
                    style={{
                      display: 'inline-block',
                      width: '7.5em',
                      height: '7.5em',
                      marginTop: '1.5em',
                    }}
                  >
                    <img
                      src="https://pa1.aminoapps.com/5799/3e1cd1ebf455f76c2baeaa112a75b6e3ddbba69e_hq.gif"
                      alt="Pokemon GIF"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        cursor: 'pointer',
                        transition: 'transform 0.1s ease-in-out',
                      }}
                      onClick={handleGifClick}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
                      onMouseUp={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    />
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
                    title="Remove"n                    type="button"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Streak display inside todo list container, below task list */}
          <div className={`
            streak-display text-center relative border-4 border-black mt-4
            ${isDarkMode ? 'bg-[#1f2937] text-[#d1d5db]' : 'bg-[#f7fee7] text-[#374151]'}
          `}
          style={{
            borderRadius: '0',
            boxShadow: isDarkMode
              ? 'inset -4px -4px 0 0 #2F4F4F, inset 4px 4px 0 0 #555555, 0 0 15px rgba(0, 0, 0, 0.4)'
              : 'inset -4px -4px 0 0 #8FBC8F, inset 4px 4px 0 0 #FFFFFF, 0 0 10px rgba(0, 0, 0, 0.3)',
            padding: '8px 16px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 'auto',
          }}>
            <div style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', fontWeight: 'bold', letterSpacing: '1px' }}>
              {currentStreak} Day{currentStreak !== 1 ? 's' : ''}
            </div>
            <div style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)', marginTop: '2px' }}>
              Streak
            </div>
          </div>
        </div>
      </div>
      {showGame && (
        <div className="fixed inset-0 flex items-center justify-center z-50">          
          <div 
            className="fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300"
            onClick={closeGame}
            style={{
              animation: isClosing 
                ? 'fadeOut 0.3s ease-in-out forwards' 
                : 'fadeIn 0.3s ease-in-out forwards'
            }}
          ></div>
          <div 
            className={`
              absolute top-1/2 left-1/2 border-4 border-black rounded-lg p-5 
              max-w-lg w-[350px] max-h-[90vh] overflow-hidden shadow-xl z-50
              ${isDarkMode ? 'text-[#d1d5db] bg-[#1f2937]' : 'text-[#374151] bg-[#f7fee7]'}
            `}
            style={{
              animation: isClosing 
                ? 'popOut 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
                : 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
              boxShadow: isDarkMode
                ? 'inset -4px -4px 0 0 #2F4F4F, inset 4px 4px 0 0 #555555, 0 0 15px rgba(0, 0, 0, 0.4)'
                : 'inset -4px -4px 0 0 #8FBC8F, inset 4px 4px 0 0 #FFFFFF, 0 0 10px rgba(0, 0, 0, 0.3)',
            }}>
            <div className="mb-4 text-lg font-semibold text-center">Ekans Game !</div>
            <div className="flex justify-center">
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className={`border-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-700'}`}
                style={{
                  boxShadow: isDarkMode ? '0 0 5px rgba(255,255,255,0.1)' : '0 0 5px rgba(0,0,0,0.2)'
                }}
                tabIndex="0"
                onKeyDown={handleKeyPress}
              />
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={gameOver ? restartGame : closeGame}
                className={`
                  px-4 py-2 border-2 border-black rounded-lg
                  transition-colors duration-150 shadow-md
                  ${isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}
                `}
              >
                {gameOver ? 'Restart' : 'Close'}
              </button>
              <div className="flex items-center">
                <span className="font-semibold">Score: {score}</span>
              </div>
            </div>
            <div className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
              Use arrow keys to help Ekans eat Togepi!
            </div>
          </div>
          <audio ref={eatSoundRef} src="/audio/snake/music_food.mp3" preload="auto" />
          <audio ref={gameOverSoundRef} src="/audio/button.mp3" preload="auto" />
        </div>
      )}
    </>
  );
}

export default TodoList;

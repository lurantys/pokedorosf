import React from 'react';

function TodoList({
  todos,
  todoInput,
  setTodoInput,
  addTodo,
  toggleTodo,
  removeTodo,
  removingIdx,
  isDarkMode
}) {
  return (
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
              style={{width: '100%', marginTop: '2.5rem'}}>
              <div style={{fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', marginBottom: '0.5em'}}>No tasks yet!</div>
              <span
                aria-label="Pokemon GIF"
                style={{
                  display: 'inline-block',
                  width: '7.5em', // 3x bigger than before
                  height: '7.5em',
                  marginTop: '1.5em',
                }}
              >
                <img src="https://pa1.aminoapps.com/5799/3e1cd1ebf455f76c2baeaa112a75b6e3ddbba69e_hq.gif" alt="Pokemon GIF" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
  );
}

export default TodoList;

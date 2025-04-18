import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (!username.trim()) return;
    localStorage.setItem('username', username);
    navigate(`/game?user=${encodeURIComponent(username)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <h1 className="text-3xl font-bold mb-4">🌎 Globetrotter Challenge</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 px-4 rounded border border-gray-300 mb-4 w-64"
      />
<button
  onClick={handleStart}
  className={`px-6 py-2 rounded-full transition ${
    username.trim()
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
  }`}
  disabled={!username.trim()}
>
  Start Game
</button>

    </div>
  );
};

export default Home;

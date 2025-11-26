import React from 'react';

const Navbar = ({ onNavigate }) => {
  return (
    <nav className="bg-primary-500 px-8 py-4 flex justify-between items-center">
      <div 
        className="text-xl font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition"
        onClick={() => onNavigate('home')}
      >
        PeerPulse
      </div>
      <div className="flex gap-3">
        <button 
          onClick={() => onNavigate('login')}
          className="bg-accent-yellow hover:bg-accent-yellow-dark text-gray-800 font-semibold px-6 py-2 rounded-full transition"
        >
          Login
        </button>
        <button 
          onClick={() => onNavigate('register')}
          className="bg-primary-300 hover:bg-primary-400 text-gray-800 font-semibold px-6 py-2 rounded-full transition"
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
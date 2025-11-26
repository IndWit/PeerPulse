import React from 'react';
import Navbar from '../components/Navbar';

const ConfirmSessionPage = ({ onNavigate }) => {
  const sessionId = '345267';
  
  const handleCopyId = () => {
    navigator.clipboard.writeText(sessionId);
    alert('Session ID copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-background-cream flex flex-col">
      <Navbar onNavigate={onNavigate} />
      
      <div className="flex-1 px-4 sm:px-8 lg:px-16 xl:px-24 py-8 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">Create New Feedback Session</h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-center font-semibold mb-3">Session Title</label>
            <input
              type="text"
              placeholder="Enter session title"
              className="w-full px-4 py-3 rounded-lg bg-background-light-gray border-none focus:outline-none"
              disabled
            />
          </div>
          
          <div>
            <label className="block text-center font-semibold mb-3">Session Description</label>
            <textarea
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-background-light-gray border-none focus:outline-none resize-none"
              disabled
            />
          </div>
          
          <div className="pt-4">
            <label className="block text-center font-semibold mb-3">Session ID</label>
            <p className="text-center text-gray-500 mb-4">ID: {sessionId}</p>
            <div className="flex justify-center">
              <button 
                onClick={handleCopyId}
                className="bg-accent-yellow hover:bg-accent-yellow-dark text-gray-800 font-semibold px-12 py-3 rounded-full transition"
              >
                Copy ID
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ConfirmSessionPage;
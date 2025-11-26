import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const CreateSessionPage = ({ onNavigate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateSession = () => {
    if (title && description) {
      onNavigate('confirmSession');
    }
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-background-light-gray border-none focus:outline-none focus:ring-2 focus:ring-accent-yellow"
            />
          </div>
          
          <div>
            <label className="block text-center font-semibold mb-3">Session Description</label>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-background-light-gray border-none focus:outline-none focus:ring-2 focus:ring-accent-yellow resize-none"
            />
          </div>
          
          <div className="flex justify-center pt-6">
            <button 
              onClick={handleCreateSession}
              className="bg-accent-yellow hover:bg-accent-yellow-dark text-gray-800 font-semibold px-12 py-3 rounded-full transition"
            >
              Create Session
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CreateSessionPage;
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const SubmitFeedbackPage = ({ onNavigate }) => {
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    if (feedback && category) {
      alert('Feedback submitted successfully!');
      setFeedback('');
      setCategory('');
    }
  };

  return (
    <div className="min-h-screen bg-background-cream flex flex-col">
      <Navbar onNavigate={onNavigate} />
      
      <div className="flex-1 px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
        <div className="bg-gradient-feedback rounded-2xl overflow-hidden mb-8 relative min-h-[300px] flex items-center">
          <div className="absolute left-8 bottom-0 w-48 h-48 opacity-40">
            <div className="w-32 h-40 bg-teal-dark rounded-t-full mx-auto"></div>
          </div>
          <div className="px-8 py-12 text-center relative z-10 w-full">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Give Feedback Anonymously
            </h1>
            <div className="text-xs text-white/50 mt-2">[Person Illustration]</div>
          </div>
        </div>
        
        <div className="space-y-6">
          <textarea
            placeholder="Enter your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={8}
            className="w-full px-6 py-4 rounded-lg bg-background-light-gray border-none focus:outline-none focus:ring-2 focus:ring-accent-yellow resize-none"
          />
          
          <div className="flex justify-center">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-8 py-3 rounded-lg bg-primary-300 border-none focus:outline-none focus:ring-2 focus:ring-accent-yellow font-semibold appearance-none cursor-pointer"
            >
              <option value="">Category</option>
              <option value="general">General</option>
              <option value="technical">Technical</option>
              <option value="content">Content</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="flex justify-center pt-6">
            <button 
              onClick={handleSubmit}
              className="bg-accent-yellow hover:bg-accent-yellow-dark text-gray-800 font-semibold px-12 py-3 rounded-full transition"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitFeedbackPage;
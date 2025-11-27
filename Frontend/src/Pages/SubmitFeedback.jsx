import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar'; // Uncomment in local project
import { Star, AlertCircle, Send } from 'lucide-react';

// Placeholder Navbar to ensure code compiles without the external file
const Navbar = ({ onNavigate }) => (
  <nav className="w-full bg-white shadow-sm px-8 py-4 flex justify-between items-center">
    <div className="font-bold text-xl text-gray-800">PeerPulse</div>
    {onNavigate && (
      <button onClick={() => onNavigate('login')} className="text-gray-600 hover:text-gray-900">
        Login
      </button>
    )}
  </nav>
);

const SubmitFeedbackPage = ({ onNavigate }) => {
  const [sessionDetails, setSessionDetails] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackLevel, setFeedbackLevel] = useState(''); // Stores Excellent, Good, Bad, etc.
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState('loading'); // loading, ready, submitting, success, error

  // 1. ON LOAD: READ URL & FETCH DETAILS
  useEffect(() => {
    const fetchSessionInfo = async () => {
      // Get ID from URL (e.g. ?session_id=12345)
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get('session_id');

      if (!sessionId) {
        setStatus('error');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/get-sessions?id=${sessionId}`);
        const data = await response.json();

        if (data && data.length > 0) {
          setSessionDetails(data[0]); 
          setStatus('ready');
        } else {
          setStatus('error'); 
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setStatus('error');
      }
    };

    fetchSessionInfo();
  }, []);

  // 2. HANDLE SUBMIT
  const handleSubmit = async () => {
    if (!feedback || !feedbackLevel || rating === 0) {
      alert('Please fill in all fields (Rating, Feedback, and Level)!');
      return;
    }

    setStatus('submitting');

    try {
      // We format the comment to include the level since backend only has 'comment'
      const finalComment = `[Level: ${feedbackLevel}] ${feedback}`;

      const response = await fetch("http://localhost:8080/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionDetails.id,
          rating: rating,
          comment: finalComment
        })
      });

      if (response.ok) {
        setStatus('success');
        setFeedback('');
        setFeedbackLevel('');
        setRating(0);
      } else {
        alert("Something went wrong. Please try again.");
        setStatus('ready');
      }
    } catch (error) {
      console.error(error);
      alert("Connection error. Is the backend running?");
      setStatus('ready');
    }
  };

  // --- UI STATES (Loading / Error / Success) ---

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-background-cream text-gray-500">Loading session...</div>;
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-cream p-4">
        <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Session Not Found</h1>
        <p className="text-gray-600 mt-2 text-center">The link might be broken or the session deleted.</p>
        {onNavigate && <button onClick={() => onNavigate('login')} className="mt-6 text-accent-yellow font-bold underline">Go Home</button>}
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-background-cream flex flex-col">
         <Navbar onNavigate={onNavigate} />
         <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
              <p className="text-gray-600">Your feedback has been sent anonymously.</p>
              <button onClick={() => setStatus('ready')} className="mt-6 text-accent-yellow font-bold underline">Submit another</button>
            </div>
         </div>
      </div>
    );
  }

  // --- MAIN FORM ---
  return (
    <div className="min-h-screen bg-background-cream flex flex-col">
      <Navbar onNavigate={onNavigate} />
      
      <div className="flex-1 px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
        {/* Header Section: Shows Real Session Details */}
        <div className="bg-gradient-feedback rounded-2xl overflow-hidden mb-8 relative min-h-[300px] flex items-center">
          <div className="absolute left-8 bottom-0 w-48 h-48 opacity-40">
            <div className="w-32 h-40 bg-teal-dark rounded-t-full mx-auto"></div>
          </div>
          <div className="px-8 py-12 text-center relative z-10 w-full">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {sessionDetails.title}
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">{sessionDetails.content}</p>
            <div className="text-xs text-white/50 mt-8 font-mono">[Anonymous Feedback Portal]</div>
          </div>
        </div>
        
        <div className="space-y-8 max-w-4xl mx-auto">
          
          {/* Star Rating Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-3">
            <label className="text-gray-500 font-bold uppercase tracking-wide text-xs">Rate your experience</label>
            <div className="flex gap-3">
               {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transform transition hover:scale-110 focus:outline-none"
                  >
                    <Star 
                      className={`w-10 h-10 ${star <= rating ? 'fill-accent-yellow text-accent-yellow' : 'text-gray-300'}`} 
                    />
                  </button>
                ))}
            </div>
          </div>

          {/* Feedback Text Area */}
          <textarea
            placeholder="Enter your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={8}
            className="w-full px-6 py-4 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-yellow resize-none shadow-sm text-lg"
          />
          
          {/* Feedback Level Dropdown */}
          <div className="flex justify-center">
            <select
              value={feedbackLevel}
              onChange={(e) => setFeedbackLevel(e.target.value)}
              className="px-8 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-yellow font-semibold appearance-none cursor-pointer shadow-sm text-gray-700 min-w-[200px] text-center"
            >
              <option value="">Select Level</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
              <option value="Bad">Bad</option>
            </select>
          </div>
          
          <div className="flex justify-center pt-2">
            <button 
              onClick={handleSubmit}
              className="bg-accent-yellow hover:bg-accent-yellow-dark text-gray-900 font-bold px-12 py-4 rounded-full transition shadow-lg transform active:translate-y-0.5"
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
import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar'; // Uncomment this in your local project

// Placeholder Navbar to ensure code compiles without the external file
const Navbar = ({ onNavigate }) => (
  <nav className="w-full bg-white shadow-sm px-8 py-4 flex justify-between items-center">
    <div className="font-bold text-xl text-gray-800">PeerPulse</div>
    <button 
      onClick={() => onNavigate && onNavigate('login')} 
      className="text-gray-600 hover:text-gray-900"
    >
      Logout
    </button>
  </nav>
);

const SessionSelect = ({ onNavigate, setCurrentSession }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch Real Data on Load ---
  useEffect(() => {
    const fetchMySessions = async () => {
      const adminId = localStorage.getItem("adminId");
      
      if (!adminId) {
        alert("Please login first!");
        if (onNavigate) onNavigate('login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/get-sessions?creator_id=${adminId}`);
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error("Error loading sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMySessions();
  }, [onNavigate]); 

  const openSession = (s) => {
    localStorage.setItem("selectedSessionId", s.id); 
    if (setCurrentSession) setCurrentSession(s.id);
    if (onNavigate) onNavigate('dashboard');
  };

  // --- NEW: Copy Link Function ---
  const copyShareLink = (id) => {
    // Creates: http://localhost:5173/submit-feedback?session_id=123...
    const link = `${window.location.origin}/submit-feedback?session_id=${id}`;
    
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied to clipboard!\n\n" + link);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="min-h-screen bg-background-cream flex flex-col">
      <Navbar onNavigate={onNavigate} />

      <div className="flex-1 px-6 lg:px-20 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Published Sessions</h1>
          <p className="text-gray-600 mb-6">Select a published session to view its dashboard.</p>

          {loading ? (
             <div className="text-center text-gray-500 py-10">Loading your sessions...</div>
          ) : sessions.length === 0 ? (
             <div className="text-center bg-white p-8 rounded-lg border border-gray-200">
                <p className="text-gray-500 mb-4">You haven't created any sessions yet.</p>
                <button onClick={() => onNavigate && onNavigate('createSession')} className="text-accent-yellow font-bold underline">Create your first one!</button>
             </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((s) => (
                <div key={s.id} className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
                  <div>
                    <div className="font-semibold text-lg">{s.title}</div>
                    <div className="text-xs text-gray-500 mt-1 max-w-md truncate">
                      {s.content}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => openSession(s)} 
                      className="px-5 py-2 rounded-full bg-accent-yellow hover:bg-accent-yellow-dark font-semibold text-gray-800 transition"
                    >
                      Open Dashboard
                    </button>
                    
                    {/* UPDATED BUTTON: Copies the Share Link */}
                    <button 
                      onClick={() => copyShareLink(s.id)} 
                      className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition font-medium flex items-center gap-2"
                      title="Copy Shareable Link"
                    >
                      🔗 Copy Link
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => onNavigate && onNavigate('createSession')} 
              className="px-6 py-3 rounded-xl bg-gray-800 text-white hover:bg-gray-900 transition font-medium shadow-lg"
            >
              + Create new session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionSelect;
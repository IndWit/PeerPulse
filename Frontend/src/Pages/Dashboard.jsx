import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar'; 

// Placeholder Navbar
const Navbar = ({ onNavigate }) => (
  <nav className="w-full bg-white shadow-sm px-8 py-4 flex justify-between items-center">
    <div className="font-bold text-xl text-gray-800">PeerPulse</div>
    <button onClick={() => onNavigate && onNavigate('login')} className="text-gray-600 hover:text-gray-900">Logout</button>
  </nav>
);

const AdminDashboard = ({ onNavigate, sessionId }) => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [stats, setStats] = useState({ total: 0, positive: 0, negative: 0 });
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState(sessionId);

  // 1. Load Data on Mount
  const fetchData = async () => {
    setLoading(true);
    // Logic: Try the prop first, fallback to localStorage if page refreshed
    let idToUse = sessionId || localStorage.getItem("selectedSessionId");
    setCurrentId(idToUse);

    console.log("Dashboard loading for Session ID:", idToUse); // DEBUG LOG

    if (!idToUse) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/view-feedback?session_id=${idToUse}`);
      const data = await response.json();
      
      console.log("Feedback received from backend:", data); // DEBUG LOG

      // Safety check: ensure data is an array
      const safeData = Array.isArray(data) ? data : [];
      setFeedbackData(safeData);
      calculateStats(safeData);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sessionId]);

  // 2. Helper: Parse the "Level" from the comment string
  // Backend saves: "[Level: Excellent] The actual comment..."
  const parseFeedback = (fullComment) => {
    // Check if comment exists to prevent crashes
    if (!fullComment) return { level: 'Neutral', text: 'No comment provided' };

    const match = fullComment.match(/\[Level: (.*?)\] (.*)/);
    if (match) {
      return { level: match[1], text: match[2] };
    }
    // Fallback for old data
    return { level: 'Neutral', text: fullComment };
  };

  // 3. Helper: Calculate Stats dynamically
  const calculateStats = (data) => {
    let pos = 0;
    let neg = 0;

    data.forEach(item => {
      const { level } = parseFeedback(item.comment);
      if (['Excellent', 'Good'].includes(level)) pos++;
      if (['Poor', 'Bad'].includes(level)) neg++;
    });

    setStats({
      total: data.length,
      positive: pos,
      negative: neg
    });
  };

  // 4. Helper: Get Badge Color
  const getSentimentColor = (level) => {
    switch (level) {
      case 'Excellent':
      case 'Good': 
        return 'bg-green-100 text-green-800 border-green-200'; // Positive
      case 'Bad': 
      case 'Poor': 
        return 'bg-red-100 text-red-800 border-red-200'; // Negative
      default: 
        return 'bg-gray-100 text-gray-800 border-gray-200'; // Neutral/Fair
    }
  };

  return (
    <div className="min-h-screen bg-background-cream flex flex-col">
      <Navbar onNavigate={onNavigate} />
      
      <div className="flex-1 px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-600 text-sm md:text-base">Real-time overview of incoming feedback</p>
            {currentId ? (
              <div className="text-sm text-gray-700 mt-2 bg-white inline-block px-3 py-1 rounded-lg border border-gray-200 shadow-sm">
                Viewing Session ID: <span className="font-mono font-bold text-accent-yellow-dark">{currentId}</span>
              </div>
            ) : (
              <div className="text-sm text-red-500 mt-2 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> No session selected
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
             <button onClick={fetchData} className="px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-sm font-medium">🔄 Refresh</button>
            <button onClick={() => onNavigate && onNavigate('selectSession')} className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition shadow-sm text-sm font-medium">Switch Session</button>
            <button onClick={() => onNavigate && onNavigate('createSession')} className="px-4 py-2 rounded-lg bg-accent-yellow hover:bg-accent-yellow-dark font-semibold shadow-sm transition text-sm">Create New</button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Total Responses</h3>
            <p className="text-4xl font-bold mb-1 text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-400">All time</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Positive Sentiment</h3>
            <p className="text-4xl font-bold mb-1 text-green-600">{stats.positive}</p>
            <p className="text-xs text-gray-400">Rated Good or Excellent</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Negative Sentiment</h3>
            <p className="text-4xl font-bold mb-1 text-red-500">{stats.negative}</p>
            <p className="text-xs text-gray-400">Rated Poor or Bad</p>
          </div>
        </div>

        {/* Recent Feedback Table */}
        <div className="bg-white rounded-2xl border border-gray-200 mb-12 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Recent Feedback</h2>
          </div>
          
          {loading ? (
             <div className="p-10 text-center text-gray-500">Loading data...</div>
          ) : feedbackData.length === 0 ? (
             <div className="p-10 text-center text-gray-400 italic">No feedback received for this session yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-600 text-sm uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-600 text-sm uppercase tracking-wider">Feedback</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-600 text-sm uppercase tracking-wider">Sentiment</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-600 text-sm uppercase tracking-wider">Respondent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {feedbackData.map((item, index) => {
                    const { level, text } = parseFeedback(item.comment);
                    return (
                      <tr key={index} className="hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4 font-bold text-gray-700">
                           {item.rating} <span className="text-accent-yellow">★</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 leading-relaxed max-w-lg">{text}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getSentimentColor(level)}`}>
                            {level}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400 italic">Anonymous</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Placeholder for Quiz Section (Static for now) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 opacity-60 pointer-events-none grayscale">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold text-gray-800">Quiz Analytics</h2>
             <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded">Coming Soon</span>
          </div>
          <div className="flex items-end gap-4 h-32 justify-center">
             <div className="text-gray-400">Quiz features will appear here in version 2.0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
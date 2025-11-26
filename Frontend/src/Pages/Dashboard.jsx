import React from 'react';
import Navbar from '../components/Navbar';

const AdminDashboard = ({ onNavigate, sessionId }) => {
  const feedbackData = [
    { user: 'Sarah Chan', feedback: 'The new interface is intuitive and easy to use.', sentiment: 'Positive', date: '2023-11-15' },
    { user: 'David Lee', feedback: 'I encountered some issues with the quiz submission process.', sentiment: 'Negative', date: '2023-11-14' },
    { user: 'Emily Wong', feedback: 'Overall, the experience was satisfactory.', sentiment: 'Neutral', date: '2023-11-13' },
    { user: 'Michael Brown', feedback: 'The feedback structure could be more user-friendly.', sentiment: 'Neutral', date: '2023-11-12' },
    { user: 'Jessica Garcia', feedback: 'I appreciate the quick response to my previous feedback.', sentiment: 'Positive', date: '2023-11-11' },
  ];

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive': return 'bg-sentiment-positive text-gray-800';
      case 'Negative': return 'bg-sentiment-negative text-gray-800';
      case 'Neutral': return 'bg-sentiment-neutral text-gray-800';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background-cream flex flex-col">
      <Navbar onNavigate={onNavigate} />
      
      <div className="flex-1 px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-600 text-sm md:text-base">Overview of recent feedback and quiz results</p>
            {sessionId ? (
              <div className="text-sm text-gray-700 mt-2">Viewing session: <span className="font-mono">{sessionId}</span></div>
            ) : (
              <div className="text-sm text-red-600 mt-2">No session selected</div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('selectSession')} className="px-3 py-1 rounded border border-gray-200 bg-white">Select Session</button>
            <button onClick={() => onNavigate('createSession')} className="px-4 py-2 rounded bg-accent-yellow font-semibold">Create Session</button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Responses</h3>
            <p className="text-3xl font-bold mb-1">1,250</p>
            <p className="text-sm text-green-600">+15%</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Positive Feedback</h3>
            <p className="text-3xl font-bold mb-1">850</p>
            <p className="text-sm text-green-600">-5%</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Negative Feedback</h3>
            <p className="text-3xl font-bold mb-1">200</p>
            <p className="text-sm text-red-600">+10%</p>
          </div>
        </div>

        {/* Recent Feedback Table */}
        <div className="bg-white rounded-lg border border-gray-200 mb-12">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Recent Feedback</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-accent-yellow">
                    <th className="px-6 py-3 text-left font-semibold">User</th>
                    <th className="px-6 py-3 text-left font-semibold">Feedback</th>
                    <th className="px-6 py-3 text-left font-semibold">Sentiment</th>
                    <th className="px-6 py-3 text-left font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbackData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="px-6 py-4">{item.user}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.feedback}</td>
                      <td className="px-6 py-4">
                        <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getSentimentColor(item.sentiment)}`}>
                          {item.sentiment}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quiz Responses */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold mb-6">Quiz Responses</h2>
          
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Quiz Completion Rates</h3>
            <p className="text-4xl font-bold mb-2">75%</p>
            <p className="text-sm text-green-600 mb-6">Day / Days +5%</p>
          </div>
          
          <div className="flex items-end gap-4 h-48">
            {[75, 78, 72, 76, 74].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-sentiment-positive rounded-t"
                  style={{ height: `${value}%` }}
                ></div>
                <span className="text-sm text-gray-600 mt-2">Quiz {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
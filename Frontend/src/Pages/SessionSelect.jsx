import React from 'react';
import Navbar from '../components/Navbar';

const SessionSelect = ({ onNavigate, setCurrentSession }) => {
  // sample published sessions (replace with API call later)
  const sessions = [
    { id: 'sess_001', title: 'Weekly Team Retro', published: true },
    { id: 'sess_002', title: 'Product Feedback Round', published: true },
    { id: 'sess_003', title: 'Onboarding Pulse', published: true },
  ];

  const openSession = (s) => {
    setCurrentSession(s.id);
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-background-cream flex flex-col">
      <Navbar onNavigate={onNavigate} />

      <div className="flex-1 px-6 lg:px-20 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Published Sessions</h1>
          <p className="text-gray-600 mb-6">Select a published session to view its dashboard. Each session has a unique ID.</p>

          <div className="space-y-4">
            {sessions.map((s) => (
              <div key={s.id} className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                <div>
                  <div className="font-semibold">{s.title}</div>
                  <div className="text-xs text-gray-500">Session ID: <span className="font-mono">{s.id}</span></div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => openSession(s)} className="px-4 py-2 rounded-full bg-accent-yellow font-semibold">Open</button>
                  <button onClick={() => navigator.clipboard?.writeText(s.id)} className="px-3 py-1 rounded border border-gray-200 text-sm">Copy ID</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button onClick={() => onNavigate('createSession')} className="px-4 py-2 rounded bg-primary-500 text-white">Create new session</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionSelect;

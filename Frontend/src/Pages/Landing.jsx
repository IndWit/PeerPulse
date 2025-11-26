import React from 'react';
import Navbar from '../components/Navbar';
import { Twitter, Facebook, Instagram, CheckCircle, Users, BarChart2, Lock } from 'lucide-react';

const Feature = ({ Icon, title, desc }) => (
  <div className="bg-yellow p-6 rounded-2xl shadow-sm hover:shadow-lg transition">
    <div className="text-accent-yellow mb-4">
      <Icon className="w-10 h-10" />
    </div>
    <h3 className="font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-background-cream flex flex-col">
      <Navbar onNavigate={onNavigate} />

      <main className="flex-1 px-6 lg:px-20 py-12">
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
              Peer feedback that actually helps teams grow
            </h1>
            <p className="text-lg text-gray-700 max-w-xl">
              PeerPulse makes collecting honest, anonymous feedback fast and easy — with beautiful
              dashboards, secure data handling, and simple sharing tools.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <button onClick={() => onNavigate('register')} className="inline-flex items-center gap-3 bg-gradient-to-r from-accent-yellow to-accent-yellow-dark text-gray-900 font-semibold px-6 py-3 rounded-2xl shadow-lg transition">
                Get started — it's free
              </button>
              <button onClick={() => onNavigate('submitFeedback')} className="inline-flex items-center gap-2 border border-gray-200 text-gray-800 px-5 py-3 rounded-2xl hover:shadow-sm transition">
                Try giving feedback
              </button>
            </div>

            <div className="mt-6 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full shadow"><CheckCircle className="w-5 h-5 text-accent-yellow" /></div>
                <div>
                  <div className="text-sm font-semibold">Anonymous by default</div>
                  <div className="text-xs text-gray-500">No names, only insights</div>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-3">
                <div className="bg-white p-2 rounded-full shadow"><Users className="w-5 h-5 text-sky-500" /></div>
                <div>
                  <div className="text-sm font-semibold">Team-friendly</div>
                  <div className="text-xs text-gray-500">Easy to onboard</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-red to-red-dark p-8 flex items-center justify-center shadow-2xl transform hover:scale-[1.02] transition">
            <div className="w-full max-w-md text-center text-white">
              <div className="w-32 h-32 mx-auto rounded-full bg-orange mb-6 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-orange-light"></div>
              </div>
              <h3 className="text-xl font-bold">Collect more honest feedback</h3>
              <p className="mt-3 text-sm text-white/90">Share links, invite teams, and see results in minutes.</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Feature Icon={CheckCircle} title="Anonymous" desc="Feedback is anonymous by default, so responses stay honest." />
            <Feature Icon={BarChart2} title="Insightful dashboards" desc="Visualize trends, ratings and comments at a glance." />
            <Feature Icon={Users} title="Team friendly" desc="Quick setup for teams and classrooms." />
            <Feature Icon={Lock} title="Secure" desc="Data encrypted in transit & at rest." />
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">What people say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-100"></div>
                <div>
                  <div className="font-semibold">Samantha</div>
                  <div className="text-xs text-gray-500">Engineering Manager</div>
                </div>
              </div>
              <p className="text-sm text-gray-700">"PeerPulse helped our team surface honest feedback and improved our retrospectives."</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-100"></div>
                <div>
                  <div className="font-semibold">Ravi</div>
                  <div className="text-xs text-gray-500">HR Lead</div>
                </div>
              </div>
              <p className="text-sm text-gray-700">"Setup was fast and admins love the analytics dashboard for trends."</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-100"></div>
                <div>
                  <div className="font-semibold">Lina</div>
                  <div className="text-xs text-gray-500">Product Designer</div>
                </div>
              </div>
              <p className="text-sm text-gray-700">"The anonymous mode increases response rates and leads to actionable insights."</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 rounded-2xl bg-gradient-to-r from-sky-50 to-white p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3">Ready to hear honest feedback?</h3>
            <p className="text-gray-700 mb-6">Sign up and start collecting feedback in minutes — free for small teams.</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => onNavigate('register')} className="bg-gradient-to-r from-accent-yellow to-accent-yellow-dark px-6 py-3 rounded-2xl font-semibold shadow-lg">Create account</button>
              <button onClick={() => onNavigate('login')} className="px-6 py-3 rounded-2xl border border-gray-200">Admin login</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">© {new Date().getFullYear()} PeerPulse. Built with care.</div>
          <div className="flex items-center gap-4">
            <Twitter className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <Facebook className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <Instagram className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
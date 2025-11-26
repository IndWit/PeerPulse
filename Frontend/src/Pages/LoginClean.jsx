import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (e) => {
    e?.preventDefault();
    if (email && password) onNavigate?.('dashboard');
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/login-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 max-w-xl w-full px-6 md:px-10">
        <form
          onSubmit={handleSignIn}
          className="mx-auto bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-10"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">Peer Plus</h3>
            <p className="text-sm text-gray-600 mt-2">Login</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-600 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username@gmail.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/80 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-yellow"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/80 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-yellow"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-md"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-accent-yellow hover:bg-accent-yellow-dark text-gray-900 font-semibold py-3 rounded-full transition"
              >
                Sign in
              </button>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-700">Don't have an account?{' '}
              <button
                type="button"
                onClick={() => onNavigate?.('register')}
                className="text-accent-yellow font-semibold ml-1"
              >
                Register for free
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

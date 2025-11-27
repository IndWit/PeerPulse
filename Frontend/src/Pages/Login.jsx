import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e) => {
    e?.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login success:", data);
        
        // --- CRITICAL LINE: THIS SAVES YOUR ID ---
        localStorage.setItem("adminId", data.id); 
        // ----------------------------------------

        alert("Welcome back, " + (data.name || "User") + "!");
        onNavigate?.('dashboard');
      } else {
        alert("Login failed: " + (data.status || "Invalid credentials"));
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Could not connect to the server. Is the Go backend running?");
    }
  };

  return (
    <div className="h-screen w-screen bg-background-cream overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-3xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
          {/* Left art */}
          <div className="hidden lg:flex items-center justify-center bg-gradient-register p-8">
            <div className="w-64 h-96 bg-gradient-to-b from-red to-red-dark rounded-3xl shadow-inner flex flex-col items-center justify-center text-white/30 transform transition-all duration-700 hover:scale-105">
              <div className="w-28 h-28 rounded-full bg-orange flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-orange-light"></div>
              </div>
              <div className="text-sm opacity-70">Welcome back</div>
            </div>
          </div>

          {/* Right form */}
          <div className="p-8 lg:p-12">
            <div className="text-left mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Welcome back</h3>
              <p className="text-sm text-gray-600 mt-1">Sign in to continue to Peer Plus</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-5">
              <div>
                <label className="block text-xs text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-yellow shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-yellow shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-2 rounded-md"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-accent-yellow to-accent-yellow-dark text-gray-900 font-semibold py-3 rounded-2xl shadow-lg hover:brightness-95 transition"
                >
                  Sign in
                </button>
              </div>

              <div className="text-sm text-center text-gray-600 mt-20">
                Don't have an account?{' '}
                <button type="button" onClick={() => onNavigate?.('register')} className="text-accent-yellow font-semibold">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
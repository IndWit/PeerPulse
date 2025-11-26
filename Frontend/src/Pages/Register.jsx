import React, { useState } from 'react';
import { Eye, EyeOff, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const RegisterPage = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    if (email && fullName && password) {
      alert('Account created successfully!');
      onNavigate('login');
    }
  };

  return (
    <div className="min-h-screen bg-background-cream flex items-stretch p-0 m-0 overflow-hidden">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left Side - Illustration */}
        <div className="bg-gradient-register p-6 lg:p-10 flex items-center justify-center relative overflow-hidden">
          {/* Phone Illustration - Very Large */}
          <div className="w-full h-full bg-gradient-to-b from-red to-red-dark rounded-3xl lg:rounded-[3rem] shadow-2xl relative flex flex-col items-center justify-between py-8 lg:py-12 transform transition-all duration-700 hover:scale-[1.01]">
            {/* Profile Icon */}
            <div className="w-32 h-32 lg:w-48 lg:h-48 bg-orange rounded-full flex items-center justify-center mt-4">
              <div className="w-24 h-24 lg:w-36 lg:h-36 bg-orange-light rounded-full"></div>
            </div>
            <div className="text-center text-white/20 text-sm lg:text-base">
              [User Icon]
            </div>
            
            {/* Input Fields Representation */}
            <div className="space-y-4 lg:space-y-6 w-4/5 mb-8">
              <div className="w-full h-5 lg:h-7 bg-accent-yellow-light rounded-lg"></div>
              <div className="flex gap-2 lg:gap-4 justify-center">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-8 h-8 lg:w-12 lg:h-12 bg-accent-yellow-light rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white p-6 lg:p-12 xl:p-20 flex flex-col justify-center overflow-y-auto">
          <div className="w-full px-4 lg:px-12">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-6 lg:mb-10 text-left text-gray-900">Create an account</h1>
          
          <div className="space-y-5 lg:space-y-6">
            <div>
              <label className="block text-sm lg:text-base text-gray-500 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 lg:py-4 text-base lg:text-lg bg-gray-50 text-gray-800 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-yellow border border-gray-200 shadow-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm lg:text-base text-gray-500 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-5 py-3.5 lg:py-4 text-base lg:text-lg bg-gray-50 text-gray-800 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-yellow border border-gray-200"
              />
            </div>
            
            <div>
              <label className="block text-sm lg:text-base text-gray-500 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3.5 lg:py-4 text-base lg:text-lg bg-gray-50 text-gray-800 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-yellow border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5 lg:w-6 lg:h-6" /> : <Eye className="w-5 h-5 lg:w-6 lg:h-6" />}
                </button>
              </div>
            </div>
            
            <button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-accent-yellow to-accent-yellow-dark hover:from-accent-yellow-dark hover:to-accent-yellow text-gray-900 font-semibold text-lg lg:text-xl py-4 lg:py-5 rounded-2xl shadow-lg transition-transform transform hover:-translate-y-0.5 mt-6"
            >
              Create an account
            </button>
          </div>
          
          <p className="text-center mt-6 lg:mt-8 text-base lg:text-lg text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => onNavigate('login')}
              className="text-accent-yellow font-semibold hover:underline"
            >
              Login
            </button>
          </p>
          
          <div className="flex justify-center gap-4 lg:gap-5 mt-6 lg:mt-8">
            <button className="w-11 h-11 lg:w-12 lg:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <Facebook className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
            </button>
            <button className="w-13 h-10 lg:w-12 lg:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <Twitter className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
            </button>
            <button className="w-11 h-11 lg:w-12 lg:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <Instagram className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
            </button>
            <button className="w-11 h-11 lg:w-12 lg:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <Linkedin className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
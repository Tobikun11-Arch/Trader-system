'use client';
import React, {useState} from 'react';
import {useAuth} from './AuthProvider';
import {GoogleButton} from '@/components/ui/custom/GoogleButton';
import {Eye, EyeOff} from 'lucide-react';

export const AuthForm: React.FC = () => {
  const {login, register, loginWithGoogle, isLoading, error} = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      await login({email, password});
    } else {
      await register({email, password});
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center  via-cyan-900 to-gray-900">
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-white/70 backdrop-blur-lg border border-white/30 shadow-2xl flex flex-col items-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-wide text-center drop-shadow-lg">
          Welcome Back
        </h2>
        {/* Tab Switcher */}
        <div className="flex w-full mb-8 rounded-full bg-gray-900/80 p-1">
          <button
            className={`flex-1 py-2 rounded-full text-lg font-semibold transition-all ${
              mode === 'login'
                ? 'bg-cyan-400 text-gray-900 shadow'
                : 'text-white'
            }`}
            onClick={() => setMode('login')}
            type="button"
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 rounded-full text-lg font-semibold transition-all ${
              mode === 'register'
                ? 'bg-cyan-400 text-gray-900 shadow'
                : 'text-white'
            }`}
            onClick={() => setMode('register')}
            type="button"
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <label className="block text-gray-900 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Type Your Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-full bg-gray-100/80 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-gray-200"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-gray-900 font-semibold mb-1">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Type Your Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-full bg-gray-100/80 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-gray-200 pr-12"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-9 text-gray-400 hover:text-cyan-500 focus:outline-none"
              tabIndex={-1}
              onClick={() => setShowPassword(v => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="flex items-center justify-between text-gray-700 text-sm mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="accent-cyan-400 w-4 h-4 rounded"
              />
              Remember Me
            </label>
            <button type="button" className="hover:underline text-gray-500">
              Forgot Password ?
            </button>
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-cyan-400 text-gray-900 font-semibold text-lg shadow hover:bg-cyan-300 transition disabled:opacity-60 mt-2"
            disabled={isLoading}
          >
            {isLoading
              ? 'Loading...'
              : mode === 'login'
              ? 'Submit'
              : 'Register'}
          </button>
        </form>
        <div className="flex items-center w-full my-6">
          <div className="flex-1 h-px bg-gray-300/60" />
          <span className="mx-4 text-white text-sm">Or</span>
          <div className="flex-1 h-px bg-gray-300/60" />
        </div>
        <GoogleButton onClick={loginWithGoogle} isLoading={isLoading} />
      </div>
    </div>
  );
};

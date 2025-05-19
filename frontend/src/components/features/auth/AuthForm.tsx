'use client';
import React, {useState} from 'react';
import {useAuth} from './AuthProvider';
import {GoogleButton} from '@/components/ui/custom/GoogleButton';

export const AuthForm: React.FC = () => {
  const {login, register, loginWithGoogle, isLoading, error} = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      await login({email, password});
    } else {
      await register({email, password});
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {mode === 'login' ? 'Sign In' : 'Register'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-semibold"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Register'}
        </button>
      </form>
      <div className="my-4 flex items-center justify-center">
        <span className="text-gray-400 text-xs">OR</span>
      </div>
      <GoogleButton onClick={loginWithGoogle} isLoading={isLoading} />
      <div className="mt-4 text-center">
        {mode === 'login' ? (
          <span>
            Don&apos;t have an account?{' '}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setMode('register')}
            >
              Register
            </button>
          </span>
        ) : (
          <span>
            Already have an account?{' '}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setMode('login')}
            >
              Sign In
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

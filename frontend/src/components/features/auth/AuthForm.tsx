'use client';
import React, {useState} from 'react';
import {useAuth} from './AuthProvider';
import {GoogleButton} from '@/components/ui/custom/GoogleButton';
import {Eye, EyeOff} from 'lucide-react';
import {useRouter} from 'next/navigation';

interface AuthFormProps {
  mode?: 'login' | 'register';
}

export const AuthForm: React.FC<AuthFormProps> = ({mode = 'login'}) => {
  const {login, register, loginWithGoogle, isLoading, error} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      await login({email, password});
    } else {
      await register({email, password});
    }
  };

  const handleModeSwitch = () => {
    if (mode === 'login') {
      router.push('/register');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="w-full min-h-full flex items-center justify-center bg-white rounded-xl">
      <div className="w-full max-w-md p-8 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-sans text-left w-full">
          {mode === 'login' ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="text-gray-500 text-base mb-8 w-full text-left">
          {mode === 'login'
            ? 'Welcome back! Please enter your details.'
            : 'Get started with your free account.'}
        </p>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label className="block text-gray-900 font-medium mb-2 text-sm">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-900 font-medium mb-2 text-sm">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all duration-200 pr-12"
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
                tabIndex={-1}
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {mode === 'login' && (
              <div className="mt-2 text-right">
                <button
                  type="button"
                  className="text-sm font-semibold text-gray-900 hover:underline"
                >
                  Forgot password
                </button>
              </div>
            )}
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center font-medium">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gray-900 text-white font-semibold text-base shadow-sm hover:bg-gray-800 transition-all duration-200 disabled:opacity-60 mt-2"
            disabled={isLoading}
          >
            {isLoading
              ? 'Loading...'
              : mode === 'login'
              ? 'Login'
              : 'Create account'}
          </button>
        </form>
        <div className="w-full my-4">
          <GoogleButton onClick={loginWithGoogle} isLoading={isLoading} />
        </div>
        <div className="w-full text-center mt-4 text-gray-500 text-sm">
          {mode === 'login'
            ? "Don't have an account? "
            : 'Already have an account? '}
          <button
            type="button"
            onClick={handleModeSwitch}
            className="font-semibold text-gray-900 hover:underline"
          >
            {mode === 'login' ? 'Sign up for free' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

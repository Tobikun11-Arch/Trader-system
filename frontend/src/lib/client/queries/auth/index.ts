import {useState} from 'react';
import {AuthCredentials, AuthUser} from '@/types/auth';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: AuthCredentials) => {
    setIsLoading(true);
    setError(null);
    await new Promise(r => setTimeout(r, 800));
    if (
      credentials.email === 'demo@user.com' &&
      credentials.password === 'demo'
    ) {
      setIsLoading(false);
      return {
        id: '1',
        name: 'Demo User',
        email: credentials.email
      } satisfies AuthUser;
    } else {
      setIsLoading(false);
      setError('Invalid credentials');
      return null;
    }
  };

  return {login, isLoading, error};
}

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (credentials: AuthCredentials) => {
    setIsLoading(true);
    setError(null);
    await new Promise(r => setTimeout(r, 800));
    if (credentials.email && credentials.password) {
      setIsLoading(false);
      return {
        id: '2',
        name: 'New User',
        email: credentials.email
      } satisfies AuthUser;
    } else {
      setIsLoading(false);
      setError('Missing fields');
      return null;
    }
  };

  return {register, isLoading, error};
}

export function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    await new Promise(r => setTimeout(r, 800));
    setIsLoading(false);
    return {
      id: '3',
      name: 'Google User',
      email: 'google@user.com',
      avatarUrl: '/avatar.png'
    } satisfies AuthUser;
  };

  return {loginWithGoogle, isLoading, error};
}

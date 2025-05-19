import React, {createContext, useContext, useState, useCallback} from 'react';
import {AuthContextType, AuthUser, AuthCredentials} from '@/types/auth';
import {useLogin, useRegister, useGoogleAuth} from '@/lib/client/queries/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginHook = useLogin();
  const registerHook = useRegister();
  const googleHook = useGoogleAuth();

  const login = useCallback(
    async (credentials: AuthCredentials) => {
      setIsLoading(true);
      setError(null);
      const result = await loginHook.login(credentials);
      if (result) setUser(result);
      setError(loginHook.error);
      setIsLoading(false);
    },
    [loginHook]
  );

  const register = useCallback(
    async (credentials: AuthCredentials) => {
      setIsLoading(true);
      setError(null);
      const result = await registerHook.register(credentials);
      if (result) setUser(result);
      setError(registerHook.error);
      setIsLoading(false);
    },
    [registerHook]
  );

  const loginWithGoogle = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const result = await googleHook.loginWithGoogle();
    if (result) setUser(result);
    setError(googleHook.error);
    setIsLoading(false);
  }, [googleHook]);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    error,
    login,
    register,
    loginWithGoogle,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

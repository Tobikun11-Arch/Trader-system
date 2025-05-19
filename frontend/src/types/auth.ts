export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: AuthCredentials) => Promise<void>;
  register: (credentials: AuthCredentials) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

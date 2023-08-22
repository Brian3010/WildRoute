/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, createContext, useState } from 'react';

export interface TAuthContext {
  auth: Record<string, string>;
  setAuth: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

interface AuthProviderProps {
  children: ReactElement;
}

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export function AuthProvider(props: AuthProviderProps) {
  const children = props.children;
  const [auth, setAuth] = useState({});

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export default AuthContext;

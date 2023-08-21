import { ReactElement, createContext, useState } from 'react';

const AuthContext = createContext({});

interface AuthProviderProps {
  children: ReactElement;
}

export function AuthProvider(props: AuthProviderProps) {
  const children = props.children;
  const [auth, setAuth] = useState({});

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export default AuthContext;

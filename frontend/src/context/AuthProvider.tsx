/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, createContext, useState } from 'react';
import { ILoginInfo } from '../services/logUserIn';

export interface IAuthContext {
  auth: ILoginInfo;
  setAuth: React.Dispatch<React.SetStateAction<ILoginInfo>>;
}

interface AuthProviderProps {
  children: ReactElement;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider(props: AuthProviderProps) {
  const children = props.children;
  const [auth, setAuth] = useState<ILoginInfo>({
    accessToken: '',
    refreshToken: '',
    user: { _id: '', email: '', username: '' },
  });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export default AuthContext;

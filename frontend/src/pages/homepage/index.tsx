import { IAuthContext } from '../../context/AuthProvider';
import useAuth from '../../hooks/useAuth';

export default function HomePage() {
  const { auth } = useAuth() as IAuthContext;
  console.log('file: index.tsx:5 ~ HomePage ~ auth:', auth);
  return (
    <>
      <h1>this is Home Page</h1>
    </>
  );
}




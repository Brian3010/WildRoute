import { ReactElement, createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export interface IFlashContext {
  flashMsg: string;
  // setFlashMsg: React.Dispatch<React.SetStateAction<string>>;
  showMessage: (message: string) => void;
  clearFlashMsg: () => void;
}

interface FlashMsgProviderProps {
  children: ReactElement;
}

const FlashMsgContext = createContext<IFlashContext | undefined>(undefined);

export const FlashMsgProvider = ({ children }: FlashMsgProviderProps) => {
  const [flashMsg, setFlashMsg] = useState<IFlashContext['flashMsg']>('');
  //   setFlashMsg('');
  const location = useLocation();
  console.log('file: FlashMsgProvider.tsx:21 ~ FlashMsgProvider ~ location:', location.pathname);

  const clearFlashMsg = () => {
    setFlashMsg('');
  };

  const showMessage = (message: string) => {
    setFlashMsg(message);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      clearFlashMsg();
    }, 7000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <FlashMsgContext.Provider value={{ flashMsg, showMessage, clearFlashMsg }}>{children}</FlashMsgContext.Provider>
  );
};

export default FlashMsgContext;

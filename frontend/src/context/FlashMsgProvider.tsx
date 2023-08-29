import { ReactElement, createContext, useEffect, useState } from 'react';

export interface IFlashContext {
  flashMsg: string;
  setFlashMsg: React.Dispatch<React.SetStateAction<string>>;
  clearFlashMsg: () => void;
}

interface FlashMsgProviderProps {
  children: ReactElement;
}

const FlashMsgContext = createContext<IFlashContext | undefined>(undefined);

export const FlashMsgProvider = ({ children }: FlashMsgProviderProps) => {
  const [flashMsg, setFlashMsg] = useState<IFlashContext['flashMsg']>('');
  //   setFlashMsg('');

  const clearFlashMsg = () => {
    setFlashMsg('');
  };

  useEffect(() => {
    console.log('useEffect in FlashMsgProvider');
    // setFlashMsg('');
    setTimeout(() => {
      clearFlashMsg();
    }, 7000);
  }, [flashMsg]);

  return (
    <FlashMsgContext.Provider value={{ flashMsg, setFlashMsg, clearFlashMsg }}>{children}</FlashMsgContext.Provider>
  );
};

export default FlashMsgContext;

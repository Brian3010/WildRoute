import { ReactElement, createContext, useState } from 'react';

export interface IFlashContext {
  flashMessage: { type: 'error' | 'success'; message: string };
  setFlashMessage: React.Dispatch<React.SetStateAction<IFlashContext['flashMessage']>>;
}

const FlashContext = createContext<IFlashContext | undefined>(undefined);

export const FlashProvider = ({ children }: { children: ReactElement }) => {
  const [flashMessage, setFlashMessage] = useState<IFlashContext['flashMessage']>({ type: 'error', message: '' });

  return <FlashContext.Provider value={{ flashMessage, setFlashMessage }}>{children}</FlashContext.Provider>;
};

export default FlashContext;

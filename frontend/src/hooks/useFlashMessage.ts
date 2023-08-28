import { useContext } from 'react';
import FlashMsgContext, { IFlashContext } from '../context/FlashMsgProvider';

const useFlashMessage = () => {
  const context = useContext(FlashMsgContext);
  if (context === undefined) throw new Error('FlashMsgContext is undefined in useFlashMessage');
  return useContext(FlashMsgContext) as IFlashContext;
};

export default useFlashMessage;

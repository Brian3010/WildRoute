import { useContext } from 'react';
import FlashContext, { IFlashContext } from '../context/FlashProvider';

const useFlashMessage = () => {
  return useContext(FlashContext) as IFlashContext;
};

export default useFlashMessage;

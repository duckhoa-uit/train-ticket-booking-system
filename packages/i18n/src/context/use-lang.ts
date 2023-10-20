import { useContext } from 'react';

import { LangContext, LangContextType } from './lang-provider';

export function useLang(): LangContextType {
  const context = useContext(LangContext);

  if (!context) {
    throw new Error('useLang must be used within a LangProvider');
  }

  return context;
}

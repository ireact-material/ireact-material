import { createContext } from 'react';
import { LocaleContextProps } from './types/context';

// 当前加载的语言环境
const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

export default LocaleContext;

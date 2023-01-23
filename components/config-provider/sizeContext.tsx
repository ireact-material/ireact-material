import * as React from 'react';
import type { SizeType } from './types/sizeContext';

// 尺寸
const SizeContext = React.createContext<SizeType>(undefined);

export default SizeContext;

import type { FontMapToken } from '../../types/index';
import genFontSizes from './genFontSizes';

const genFontMapToken = (fontSize: number): FontMapToken => {
  const fontSizePairs = genFontSizes(fontSize);
  const lineHeights = fontSizePairs.map((pair) => pair.lineHeight);

  return {
    // lineHeight
    lineHeight: lineHeights[1],
  };
};

export default genFontMapToken;

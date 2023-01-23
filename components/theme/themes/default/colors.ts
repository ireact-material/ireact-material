import { generate } from 'ireact-material-colors';

// 生成透明度颜色 | 生成边框颜色
import { getAlphaColor, getSolidColor } from './colorAlgorithm';

// type
import type { GenerateColorMap, GenerateNeutralColorMap } from '../ColorMap';

/**
 * 生成调色版
 * @param baseColor 需要生成的颜色
 */
export const generateColorPalettes: GenerateColorMap = (baseColor: string) => {
  const colors = generate(baseColor);

  return {
    1: colors[0],
    2: colors[1],
    3: colors[2],
    4: colors[3],
    5: colors[4],
    6: colors[5],
    7: colors[6],
    8: colors[7],
    9: colors[8],
    10: colors[9],
  };
};

// 生成公共颜色调色版
export const generateNeutralColorPalettes: GenerateNeutralColorMap = (
  bgBaseColor: string,
  textBaseColor: string,
) => {
  // 背景颜色
  const colorBgBase = bgBaseColor || '#fff';

  // 文字颜色
  const colorTextBase = textBaseColor || '#000';

  return {
    // 一级文本色
    colorText: getAlphaColor(colorTextBase, 0.88),
    // 二级文本色
    colorTextSecondary: getAlphaColor(colorTextBase, 0.65),
    // 四级文本色
    colorTextQuaternary: getAlphaColor(colorTextBase, 0.25),
    // 组件容器背景色
    colorBgContainer: getSolidColor(colorBgBase, 0),
    // 二级边框色
    colorBorderSecondary: getSolidColor(colorBgBase, 6),
    // 三级填充色
    colorFillTertiary: getAlphaColor(colorTextBase, 0.04),
  };
};

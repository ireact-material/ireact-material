import { generate } from 'ireact-material-colors';

// 预设调色板
import { defaultPresetColors } from '../seed';

// 生成调色版
import genColorMapToken from '../shared/genColorMapToken';
// 公共变量
import genCommonMapToken from '../shared/genCommonMapToken';
// 设置字体
import genFontMapToken from '../shared/genFontMapToken';

// 生成调色版 | 生成公共颜色调色版
import { generateColorPalettes, generateNeutralColorPalettes } from './colors';

// type
import type { ColorPalettes, MapToken, PresetColorType, SeedToken } from '../../types';

/**
 * 导出梯度变量
 *
 * @param token 基础变量
 * @returns 梯度变量
 */
export default function derivative(token: SeedToken): MapToken {
  const colorPalettes = Object.keys(defaultPresetColors)
    .map((colorKey: keyof PresetColorType) => {
      // 生成色版
      const colors = generate(token[colorKey]);

      return new Array(10).fill(1).reduce((prev, _, i) => {
        prev[`${colorKey}-${i + 1}`] = colors[i];

        return prev;
      }, {}) as ColorPalettes;
    })
    // 循环合并对象
    .reduce((prev, cur) => {
      // 合并对象
      prev = {
        ...prev,
        ...cur,
      };

      return prev;
    }, {} as ColorPalettes);

  return {
    // 变量
    ...token,
    ...colorPalettes,

    // 生成调色版
    ...genColorMapToken(token, {
      generateColorPalettes,
      generateNeutralColorPalettes,
    }),

    // Font
    ...genFontMapToken(token.fontSize),

    // 公共变量
    ...genCommonMapToken(token),
  };
}

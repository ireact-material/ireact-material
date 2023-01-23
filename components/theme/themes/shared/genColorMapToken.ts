// type
import type { GenerateColorMap, GenerateNeutralColorMap } from '../colorMap';
import type { SeedToken } from '../../types';

interface PaletteGenerators {
  generateColorPalettes: GenerateColorMap;
  generateNeutralColorPalettes: GenerateNeutralColorMap;
}

// 彩色变量
export default function genColorMapToken(
  // 基础变量
  seed: SeedToken,
  {
    // 生成调色板
    generateColorPalettes,
    // 生成公共调色板
    generateNeutralColorPalettes,
  }: PaletteGenerators,
) {
  const {
    // 信息颜色基础颜色
    colorInfo: colorInfoBase,
    colorBgBase,
    colorTextBase,
  } = seed;

  // 信息颜色
  const infoColors = generateColorPalettes(colorInfoBase);

  // 生成公共颜色调色版
  const neutralColors = generateNeutralColorPalettes(colorBgBase, colorTextBase);

  return {
    ...neutralColors,

    // 信息颜色
    colorInfoText: infoColors[6],
    colorInfoHover: infoColors[5],
    colorInfoActive: infoColors[7],
  };
}

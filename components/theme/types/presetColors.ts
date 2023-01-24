// 预设颜色
export const presetColors = [
  'blue',
  'purple',
  'cyan',
  'green',
  'magenta',
  'pink',
  'red',
  'orange',
  'yellow',
  'volcano',
  'geekblue',
  'lime',
  'gold',
] as const;

// 颜色key
type PresetColorKey = (typeof presetColors)[number];

// 颜色类型
export type PresetColorType = Record<PresetColorKey, string>;

// 颜色 key index
type ColorPaletteKeyIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// 生成梯度颜色
export type ColorPalettes = {
  [key in `${keyof PresetColorType}-${ColorPaletteKeyIndex}`]: string;
};

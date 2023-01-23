import type { ColorNeutralMapToken } from '../types';

// 颜色循环
export interface ColorMap {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
}

// 生成调色版颜色
export type GenerateColorMap = (baseColor: string) => ColorMap;

// 生成公共颜色调色版
export type GenerateNeutralColorMap = (
  bgBaseColor: string,
  textBaseColor: string,
) => ColorNeutralMapToken;

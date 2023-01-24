import type { ColorPalettes } from '../presetColors';
import type { SeedToken } from '../seeds';
import type { ColorMapToken } from './colors';
import type { FontMapToken } from './font';
import type { HeightMapToken, SizeMapToken } from './size';
import type { StyleMapToken } from './style';

export * from './colors';
export * from './font';
export * from './size';
export * from './style';

export interface CommonMapToken extends StyleMapToken {
  // 动画持续时间 0.3s
  motionDurationSlow: string;
}

// ======================================================================
// ==             梯度变量基于 Seed 派生的梯度变量                         ==
// ======================================================================

export interface MapToken
  extends SeedToken,
    ColorPalettes,
    ColorMapToken,
    SizeMapToken,
    HeightMapToken,
    StyleMapToken,
    FontMapToken,
    CommonMapToken {}

// type
import type { CommonMapToken, SeedToken } from '../../types';

// 公共变量
export default function genCommonMapToken(token: SeedToken): CommonMapToken {
  const { motionUnit, motionBase } = token;

  return {
    // 动画持续时间

    // 0.3s
    motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,
  };
}

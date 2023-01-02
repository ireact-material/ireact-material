import type { ColorPalettes } from "../presetColors";
import type { SeedToken } from "../seeds";
import type { SizeMapToken, HeightMapToken } from "./size";
import type { ColorMapToken } from "./colors";
import type { StyleMapToken } from "./style";
import type { FontMapToken } from "./font";

export * from "./colors";
export * from "./style";
export * from "./size";
export * from "./font";

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

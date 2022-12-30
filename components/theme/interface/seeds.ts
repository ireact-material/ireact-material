import type { PresetColorType } from "./presetColors";
// ======================================================================
// ==                            基础变量                            ==
// ======================================================================

export interface SeedToken extends PresetColorType {
	//  ----------   Color   ---------- //

	/**
	 * @name 信息颜色
	 * @desc 信息都有用到该组梯度变量。
	 */
	colorInfo: string;

	//  ----------   zIndex   ---------- //

	/**
	 * @name 基础zIndex
	 * @default 0
	 */
	zIndexBase: number;
}

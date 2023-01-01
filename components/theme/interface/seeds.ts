import type { PresetColorType } from "./presetColors";
// ======================================================================
// ==                            基础变量                            ==
// ======================================================================

export interface SeedToken extends PresetColorType {
	//  ----------Color----------

	/**
	 * @name 信息颜色
	 * @desc 信息都有用到该组梯度变量。
	 */
	colorInfo: string;

	//  ----------zIndex----------

	/**
	 * @name 基础zIndex
	 * @default 0
	 */
	zIndexBase: number;

	//  ----------motion----------

	/**
	 * @name 动画时长变化单位
	 * @desc 用于控制动画时长的变化单位
	 * @default 100ms
	 */
	motionUnit: number;

	/**
	 * @name 动画基础时长
	 */
	motionBase: number;
}

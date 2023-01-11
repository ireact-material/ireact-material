import type { PresetColorType } from "./presetColors";
// ======================================================================
// ==                            基础变量                            ==
// ======================================================================

export interface SeedToken extends PresetColorType {
	//  ----------color----------

	/**
	 * @name 信息颜色
	 * @desc 信息都有用到该组梯度变量。
	 */
	colorInfo: string;

	/**
	 * @name 基础背景色
	 * @desc 用于派生背景色梯度的基础变量，添加了一层背景色的派生算法可以产出梯度明确的背景色的梯度变量
	 */
	colorBgBase: string;

	/**
	 * @name 基础文本色
	 * @desc 用于派生文本色梯度的基础变量，添加了一层文本色的派生算法可以产出梯度明确的文本色的梯度变量
	 */
	colorTextBase: string;

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

	//  ----------字体----------

	/**
	 * @name 默认字号
	 * @desc 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。
	 */
	fontSize: number;

	/**
	 * @name 字体
	 */
	fontFamily: string;

	//  ----------圆角----------

	/**
	 * @name 基础圆角
	 * @desc 基础组件的圆角大小，例如按钮、输入框、卡片等
	 */
	borderRadius: number;
}

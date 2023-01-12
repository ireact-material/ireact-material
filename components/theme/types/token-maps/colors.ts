export interface ColorNeutralMapToken {
	//  ----------text----------

	/**
	 * @name 一级文本色
	 * @desc 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。
	 */
	colorText: string;

	/**
	 * @name 四级文本色
	 * @desc 第四级文本色是最浅的文本色，例如表单的输入提示文本、禁用色文本等。
	 */
	colorTextQuaternary: string;

	//  ----------surface----------

	/**
	 * @name 组件容器背景色
	 * @desc 组件的容器背景色，例如：默认按钮、输入框等
	 */
	colorBgContainer: string;

	//  ----------边框----------
	/**
	 * @name 二级边框色
	 * @desc 比默认使用的边框色要浅一级，此颜色和 colorSplit 的颜色一致。使用的是实色。
	 */
	colorBorderSecondary: string;

	//  ----------填充----------

	/**
	 * @name 三级填充色
	 * @desc 三级填充色用于勾勒出元素形体的场景，如 Slider、Segmented 等。如无强调需求的情况下，建议使用三级填色作为默认填色。
	 */
	colorFillTertiary: string;
}

// 梯度变量
interface ColorPrimaryMapToken {}

interface ColorSuccessMapToken {}

interface ColorWarningMapToken {}

interface ColorInfoMapToken {
	/**
	 * @name 信息色的文本默认态
	 *
	 * infoColors[6]
	 */
	colorInfoText: string;

	/**
	 * @name 信息色的悬浮
	 *
	 * infoColors[5]
	 */
	colorInfoHover: string;

	/**
	 * @name 信息色的激活
	 *
	 * infoColors[7]
	 */
	colorInfoActive: string;
}

interface ColorErrorMapToken {}

export interface ColorMapToken
	extends ColorNeutralMapToken,
		ColorPrimaryMapToken,
		ColorSuccessMapToken,
		ColorWarningMapToken,
		ColorErrorMapToken,
		ColorInfoMapToken {}

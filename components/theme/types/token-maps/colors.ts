export interface ColorNeutralMapToken {
	//  ----------text----------

	/**
	 * @name 四级文本色
	 * @desc 第四级文本色是最浅的文本色，例如表单的输入提示文本、禁用色文本等。
	 */
	colorTextQuaternary: string;
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

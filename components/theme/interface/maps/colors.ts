export interface ColorNeutralMapToken {}

// 梯度变量
interface ColorPrimaryMapToken {}

interface ColorSuccessMapToken {}

interface ColorWarningMapToken {}

interface ColorInfoMapToken {
	/**
	 * @name 信息色的文本默认态
	 *
	 * infoColors[5]
	 */
	colorInfoText: string;
}

interface ColorErrorMapToken {}

export interface ColorMapToken
	extends ColorNeutralMapToken,
		ColorPrimaryMapToken,
		ColorSuccessMapToken,
		ColorWarningMapToken,
		ColorErrorMapToken,
		ColorInfoMapToken {}

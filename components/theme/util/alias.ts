import type { AliasToken } from "../types";
import type { RawMergedToken } from "./types/alias";

/**
 * 格式化变量
 * 基础变量 -> 梯度变量 -> 别名变量
 * Seed (designer) > Derivative (designer) > Alias (developer).
 *
 * 合并 基础变量 & 梯度变量 & 覆盖变量 生成别名变量
 * Merge seed & derivative & override token and generate alias token for developer.
 * @returns
 */
export default function formatToken(
	// 合并原始变量
	derivativeToken: RawMergedToken,
): AliasToken {
	const { override, ...restToken } = derivativeToken;

	// 需要覆盖的变量
	const overrideTokens = { ...override };

	// 合并样式变量
	const mergedToken = {
		// 所有内部定义的变量
		...restToken,
		// 需要覆盖的变量
		...overrideTokens,
	};

	// 媒体查询断点
	const screenXS = 480;
	const screenSM = 576;
	const screenMD = 768;
	const screenLG = 992;
	const screenXL = 1200;
	const screenXXL = 1600;

	// 别名变量 批量控制某些共性组件的样式
	const aliasToken: AliasToken = {
		// 合并样式变量
		...mergedToken,

		// ---------text颜色
		colorTextDisabled: mergedToken.colorTextQuaternary,

		// ---------链接颜色
		// a链接颜色
		colorLink: mergedToken.colorInfoText,
		colorLinkHover: mergedToken.colorInfoHover,
		colorLinkActive: mergedToken.colorInfoActive,

		// ---------文本样式

		// 文本的修饰线外观
		textDecoration: "none",

		// ---------媒体查询断点

		// 480
		screenXS,
		// xs最小尺寸
		screenXSMin: screenXS,
		// xs最大尺寸
		screenXSMax: screenSM - 1,
		// 576
		screenSM,
		// sm最小尺寸
		screenSMMin: screenSM,
		// sm最大尺寸
		screenSMMax: screenMD - 1,
		// 768
		screenMD,
		// md最小尺寸
		screenMDMin: screenMD,
		// md最大尺寸
		screenMDMax: screenLG - 1,
		// 992
		screenLG,
		// lg最小尺寸
		screenLGMin: screenLG,
		// lg最大尺寸
		screenLGMax: screenXL - 1,
		// 1200
		screenXL,
		// xl最小尺寸
		screenXLMin: screenXL,
		// xl最大尺寸
		screenXLMax: screenXXL - 1,
		// 1600
		screenXXL,
		// xxl最小尺寸
		screenXXLMin: screenXXL,

		// 需要覆盖的样式变量
		...overrideTokens,
	};

	return aliasToken;
}

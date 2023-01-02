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

		// 需要覆盖的样式变量
		...overrideTokens,
	};

	return aliasToken;
}

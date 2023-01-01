// type
// 别名变量
import type { AliasToken, MapToken, OverrideToken } from "../interface";

/** Raw merge of `@ant-design/cssinjs` token. Which need additional process */
type RawMergedToken = MapToken &
	OverrideToken & { override: Partial<AliasToken> };

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

		// ---------链接颜色
		// a链接颜色
		colorLink: mergedToken.colorInfoText,

		// ---------文本样式

		// 文本的修饰线外观
		textDecoration: "none",

		// 需要覆盖的样式变量
		...overrideTokens,
	};

	return aliasToken;
}

// type
// 别名变量
import type { AliasToken, MapToken, OverrideToken } from "../interface";

/** Raw merge of `@ant-design/cssinjs` token. Which need additional process */
type RawMergedToken = MapToken &
	OverrideToken & { override: Partial<AliasToken> };

/**
 * 格式变量
 *
 * Seed (designer) > Derivative (designer) > Alias (developer).
 *
 * 合并 seed & derivative & override token and 生成别名令牌
 * @returns
 */
export default function formatToken(
	derivativeToken: RawMergedToken,
): AliasToken {
	const { override, ...restToken } = derivativeToken;

	// 需要覆盖的样式变量
	const overrideTokens = { ...override };

	// 合并样式变量
	const mergedToken = {
		// 梯度颜色
		...restToken,
		// 需要覆盖的样式变量
		...overrideTokens,
	};

	// 别名变量 批量控制某些共性组件的样式
	const aliasToken: AliasToken = {
		// 合并token
		...mergedToken,

		// a链接颜色
		colorLink: mergedToken.colorInfoText,

		// 覆盖 别名变量
		...overrideTokens,
	};

	return aliasToken;
}

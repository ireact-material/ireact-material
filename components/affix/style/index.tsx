import type { CSSObject } from "@ant-design/cssinjs";
import type { FullToken, GenerateStyle } from "../../theme/internal";
import { genComponentStyleHook, mergeToken } from "../../theme/internal";

interface AffixToken extends FullToken<"Affix"> {
	zIndexPopup: number;
}

// 为 affix 添加样式
const genSharedAffixStyle: GenerateStyle<AffixToken> = (token): CSSObject => {
	const { componentCls } = token;

	// 生成样式
	return {
		[componentCls]: {
			position: "fixed",
			zIndex: token.zIndexPopup,
		},
	};
};

// 设置组件样式
export default genComponentStyleHook("Affix", (token) => {
	const affixToken = mergeToken<AffixToken>(token, {
		zIndexPopup: token.zIndexBase + 10,
	});

	return [genSharedAffixStyle(affixToken)];
});

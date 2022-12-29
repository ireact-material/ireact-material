import type { CSSObject } from "@ant-design/cssinjs";
import type { FullToken, GenerateStyle } from "../../theme/internal";
import { genComponentStyleHook, mergeToken } from "../../theme/internal";

interface AffixToken extends FullToken<"Affix"> {
	zIndexPopup: number;
}

// 获取公共样式
const genSharedAffixStyle: GenerateStyle<AffixToken> = (token): CSSObject => {
	const { componentCls } = token;

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

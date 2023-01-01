import type { CSSObject } from "@ant-design/cssinjs";
import type { AliasToken } from "../theme/internal";

// a标签样式
export const genLinkStyle = (token: AliasToken): CSSObject => ({
	a: {
		color: token.colorLink,
		textDecoration: token.textDecoration,
		// 删除 IE 10 中活动链接的灰色背景。
		backgroundColor: "transparent",
		outline: "none",
		cursor: "pointer",
		transition: `color ${token.motionDurationSlow}`,
		// 删除 iOS 8+ 和 Safari 8+ 中链接下划线中的空白
		"-webkit-text-decoration-skip": "objects",

		"&:hover": {
			color: token.colorLinkHover,
		},

		"&:active": {
			color: token.colorLinkActive,
		},

		[`&:active,&:hover`]: {
			textDecoration: token.linkHoverDecoration,
			outline: 0,
		},

		"&:focus": {
			textDecoration: token.linkFocusDecoration,
			outline: 0,
		},

		"&[disabled]": {
			color: token.colorTextDisabled,
			cursor: "not-allowed",
		},
	},
});

// 设置公共样式
export const genCommonStyle = (
	// 组件class
	componentPrefixCls: string,
): CSSObject => {
	const rootPrefixSelector = `[class^="${componentPrefixCls}"], [class*=" ${componentPrefixCls}"]`;

	return {
		[rootPrefixSelector]: {
			boxSizing: "border-box",

			"&::before, &::after": {
				boxSizing: "border-box",
			},

			[rootPrefixSelector]: {
				boxSizing: "border-box",

				"&::before, &::after": {
					boxSizing: "border-box",
				},
			},
		},
	};
};

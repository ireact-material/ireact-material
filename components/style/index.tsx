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

		// hover
		"&:hover": {
			color: token.colorLinkHover,
		},

		// active
		"&:active": {
			color: token.colorLinkActive,
		},

		// active,hover
		[`&:active,&:hover`]: {
			textDecoration: token.textDecoration,
			outline: 0,
		},

		// focus
		"&:focus": {
			textDecoration: token.textDecoration,
			outline: 0,
		},

		// 禁用
		"&[disabled]": {
			color: token.colorTextDisabled,
			cursor: "not-allowed",
		},
	},
});

// 设置公共样式
export const genCommonStyle = (
	// 别名变量
	token: AliasToken,
	// 组件class
	componentPrefixCls: string,
): CSSObject => {
	const { fontSize } = token;

	const rootPrefixSelector = `[class^="${componentPrefixCls}"], [class*=" ${componentPrefixCls}"]`;

	return {
		[rootPrefixSelector]: {
			fontSize,
			boxSizing: "border-box",

			// before,after
			"&::before, &::after": {
				boxSizing: "border-box",
			},

			[rootPrefixSelector]: {
				boxSizing: "border-box",

				// before,after
				"&::before, &::after": {
					boxSizing: "border-box",
				},
			},
		},
	};
};

// 设置图标样式
export const resetIcon = (): CSSObject => ({
	display: "inline-flex",
	alignItems: "center",
	color: "inherit",
	fontStyle: "normal",
	lineHeight: 0,
	textAlign: "center",
	textTransform: "none",
	// for SVG icon, see https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
	verticalAlign: "-0.125em",
	textRendering: "optimizeLegibility",
	"-webkit-font-smoothing": "antialiased",
	"-moz-osx-font-smoothing": "grayscale",

	"> *": {
		lineHeight: 1,
	},

	svg: {
		display: "inline-block",
	},

	"& &-icon": {
		display: "block",
	},
});

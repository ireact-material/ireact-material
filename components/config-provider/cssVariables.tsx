import canUseDom from "rc-util/lib/Dom/canUseDom";
import { updateCSS } from "rc-util/lib/Dom/dynamicCSS";
import warning from "../util/warning";

// type
import type { Theme } from "./types/context";

const dynamicStyleMark = `-ireact-${Date.now()}-${Math.random()}`;

export function getStyle(globalPrefixCls: string, theme: Theme) {
	console.log("theme", theme);
	const variables: Record<string, string> = {};

	// 转换为css变量
	const cssList = Object.keys(variables).map(
		(key) => `--${globalPrefixCls}-${key}: ${variables[key]};`,
	);

	return `
  :root {
    ${cssList.join("\n")}
  }
  `.trim();
}

// 生成主题
export function registerTheme(globalPrefixCls: string, theme: Theme) {
	const style = getStyle(globalPrefixCls, theme);

	if (canUseDom()) {
		updateCSS(style, `${dynamicStyleMark}-dynamic-theme`);
	} else {
		warning(
			false,
			"ConfigProvider",
			"SSR do not support dynamic theme with css variables.",
		);
	}
}

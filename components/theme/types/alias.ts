import type * as React from "react";
import type { MapToken } from "./token-maps";

// ======================================================================
// ==             别名变量用于批量控制某些共性组件的样式                     ==
// ======================================================================

export interface AliasToken extends MapToken {
	// text颜色
	colorTextDisabled: string;

	// a链接颜色
	colorLink: string;
	colorLinkHover: string;
	colorLinkActive: string;

	// 文本的修饰线外观
	textDecoration: React.CSSProperties["textDecoration"];
}

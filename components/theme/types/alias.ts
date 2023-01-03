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

	// 媒体查询断点
	screenXS: number;
	screenXSMin: number;
	screenXSMax: number;
	screenSM: number;
	screenSMMin: number;
	screenSMMax: number;
	screenMD: number;
	screenMDMin: number;
	screenMDMax: number;
	screenLG: number;
	screenLGMin: number;
	screenLGMax: number;
	screenXL: number;
	screenXLMin: number;
	screenXLMax: number;
	screenXXL: number;
	screenXXLMin: number;
}

import type * as React from "react";
import type { MapToken } from "./maps";

// ======================================================================
// ==             别名变量用于批量控制某些共性组件的样式                     ==
// ======================================================================

export interface AliasToken extends MapToken {
	// a链接颜色
	colorLink: string;

	// 文本的修饰线外观
	textDecoration: React.CSSProperties["textDecoration"];
}

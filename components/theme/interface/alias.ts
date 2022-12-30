import type { MapToken } from "./maps";

// ======================================================================
// ==             别名变量用于批量控制某些共性组件的样式                     ==
// ======================================================================

export interface AliasToken extends MapToken {
	// a链接颜色
	colorLink: string;
}

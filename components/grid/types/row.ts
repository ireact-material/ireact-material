import type * as React from "react";

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
	prefixCls?: string;
	// 是否自动换行
	wrap?: boolean;
}

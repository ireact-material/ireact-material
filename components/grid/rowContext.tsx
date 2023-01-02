import type { Context } from "react";
import { createContext } from "react";

export interface RowContextState {
	// 栅格间隔
	gutter?: [number, number];
	// 是否自动换行
	wrap?: boolean;
	// 支持 Flex Gap
	supportFlexGap?: boolean;
}

const RowContext: Context<RowContextState> = createContext({});

export default RowContext;

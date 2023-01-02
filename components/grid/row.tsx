import * as React from "react";
import classNames from "classnames";

// 全局化配置
import { ConfigContext } from "../config-provider";
import RowContext from "./rowContext";

// type
import type { RowProps } from "./types/row";

const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
	const {
		prefixCls: customizePrefixCls,
		// 子节点
		children,
		// style
		style,
		// 是否自动换行
		wrap,
		...others
	} = props;

	const {
		getPrefixCls,
		// 设置文本展示方向
		direction,
	} = React.useContext(ConfigContext);

	/* ----------------- Render ----------------------- */
	const prefixCls = getPrefixCls("row", customizePrefixCls);

	// 合并class
	const classes = classNames({
		prefixCls,
	});

	// 添加gutter相关样式
	const rowStyle: React.CSSProperties = {};

	// "gutters" 是每个渲染阶段的新数组，它会使 'React.useMemo' 无效
	// 所以我们在这里解构“gutters”变量
	const gutters = getGutter();
	const [gutterH, gutterV] = gutters;
	const rowContext = React.useMemo(
		() => ({
			// 栅格间隔
			gutter: [gutterH, gutterV] as [number, number],
			// 是否自动换行
			wrap,
			// 支持 Flex Gap
			// supportFlexGap,
		}),
		[],
	);

	return (
		<RowContext.Provider value={rowContext}>
			<div
				{...others}
				className={classes}
				style={{ ...rowStyle, ...style }}
				ref={ref}
			>
				{children}
			</div>
		</RowContext.Provider>
	);
});

// dev
if (process.env.NODE_ENV !== "production") {
	Row.displayName = "Row";
}

export default Row;

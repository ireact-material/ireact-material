import type { CSSObject } from "@ant-design/cssinjs";

// 整理组件样式hook
import { genComponentStyleHook, mergeToken } from "../../theme/internal";

// type
// 生成样式 | 组件完整的变量
import type { GenerateStyle, FullToken } from "../../theme/internal";

interface GridRowToken extends FullToken<"Grid"> {}

interface GridColToken extends FullToken<"Grid"> {
	gridColumns: number;
}

// row样式
const genGridRowStyle: GenerateStyle<GridRowToken> = (token): CSSObject => {
	const { componentCls } = token;

	return {
		// 网格系统
		[componentCls]: {
			display: "flex",
			flexFlow: "row wrap",
			minWidth: 0,

			"&::before, &::after": {
				display: "flex",
			},

			// 不换行
			"&-no-wrap": {
				flexWrap: "nowrap",
			},

			// X轴 start
			"&-start": {
				justifyContent: "flex-start",
			},

			// X轴 居中
			"&-center": {
				justifyContent: "center",
			},

			// X轴 end
			"&-end": {
				justifyContent: "flex-end",
			},

			// space-between
			"&-space-between": {
				justifyContent: "space-between",
			},

			// space-around
			"&-space-around": {
				justifyContent: "space-around",
			},

			// y轴 top
			"&-top": {
				alignItems: "flex-start",
			},

			// y轴 top
			"&-middle": {
				alignItems: "center",
			},

			// y轴 bottom
			"&-bottom": {
				alignItems: "flex-end",
			},
		},
	};
};

// row样式
export const useRowStyle = genComponentStyleHook("Grid", (token) => [
	genGridRowStyle(token),
]);

// col样式
const genGridColStyle: GenerateStyle<GridColToken> = (token): CSSObject => {
	const { componentCls } = token;

	return {
		// 组件名称
		[componentCls]: {
			position: "relative",
			maxWidth: "100%",
			// 防止列为空时折叠
			minHeight: 1,
		},
	};
};

// 循环网格列样式
const genLoopGridColumnsStyle = (
	token: GridColToken,
	sizeCls: string,
): CSSObject => {
	const { componentCls, gridColumns } = token;

	const gridColumnsStyle: CSSObject = {};

	for (let i = gridColumns; i >= 0; i--) {
		// 第一个
		if (i === 0) {
			gridColumnsStyle[`${componentCls}${sizeCls}-${i}`] = {
				display: "none",
			};

			// 逻辑内联开始插入
			gridColumnsStyle[`${componentCls}-push-${i}`] = {
				insetInlineStart: "auto",
			};

			// 逻辑内联开始插入
			gridColumnsStyle[`${componentCls}${sizeCls}-push-${i}`] = {
				insetInlineStart: "auto",
			};

			// 内联结束插入
			gridColumnsStyle[`${componentCls}-pull-${i}`] = {
				insetInlineEnd: "auto",
			};

			// 内联结束插入
			gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i}`] = {
				insetInlineEnd: "auto",
			};

			// 边距内联结束
			gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i}`] = {
				marginInlineEnd: 0,
			};

			// 设置或检索弹性盒模型对象的子元素出现的順序
			gridColumnsStyle[`${componentCls}${sizeCls}-order-${i}`] = {
				order: 0,
			};
		}
		// 其他
		else {
			// flex
			gridColumnsStyle[`${componentCls}${sizeCls}-${i}`] = {
				display: "block",
				flex: `0 0 ${(i / gridColumns) * 100}%`,
				maxWidth: `${(i / gridColumns) * 100}%`,
			};

			// 逻辑内联开始插入
			gridColumnsStyle[`${componentCls}${sizeCls}-push-${i}`] = {
				insetInlineStart: `${(i / gridColumns) * 100}%`,
			};

			// 内联结束插入
			gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i}`] = {
				insetInlineEnd: `${(i / gridColumns) * 100}%`,
			};

			// 边距内联结束
			gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i}`] = {
				marginInlineStart: `${(i / gridColumns) * 100}%`,
			};

			// 设置或检索弹性盒模型对象的子元素出现的順序
			gridColumnsStyle[`${componentCls}${sizeCls}-order-${i}`] = {
				order: i,
			};
		}
	}

	return gridColumnsStyle;
};

// Grid样式
const genGridStyle = (token: GridColToken, sizeCls: string): CSSObject =>
	genLoopGridColumnsStyle(token, sizeCls);

// 设置媒体查询样式
const genGridMediaStyle = (
	// 全局变量
	token: GridColToken,
	// 视图尺寸
	screenSize: number,
	// 尺寸名称
	sizeCls: string,
): CSSObject => ({
	[`@media (min-width: ${screenSize}px)`]: {
		...genGridStyle(token, sizeCls),
	},
});

// col样式
export const useColStyle = genComponentStyleHook("Grid", (token) => {
	const gridToken: GridColToken = mergeToken<GridColToken>(token, {
		// Row 在 Grid中分为24个部分
		gridColumns: 24,
	});

	// 媒体查询
	const gridMediaSizesMap = {
		"-sm": gridToken.screenSMMin,
		"-md": gridToken.screenMDMin,
		"-lg": gridToken.screenLGMin,
		"-xl": gridToken.screenXLMin,
		"-xxl": gridToken.screenXXLMin,
	};

	return [
		genGridColStyle(gridToken),
		genGridStyle(gridToken, ""),
		genGridStyle(gridToken, "-xs"),
		Object.keys(gridMediaSizesMap)
			.map((key: keyof typeof gridMediaSizesMap) =>
				genGridMediaStyle(gridToken, gridMediaSizesMap[key], key),
			)
			.reduce((pre, cur) => ({ ...pre, ...cur }), {}),
	];
});

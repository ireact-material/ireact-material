import type { CSSInterpolation, Theme } from "@ant-design/cssinjs";
import {
	createTheme,
	useCacheToken,
	useStyleRegister,
} from "@ant-design/cssinjs";
import React from "react";
// 组件库版本
import version from "../version";

// 预设颜色
import { presetColors } from "./interface";

// 导出生成的梯度变量
import defaultDerivative from "./themes/default";
// 基础变量
import defaultSeedToken from "./themes/seed";

// 批量控制某些共性组件的样式
import formatToken from "./util/alias";
// 整理组件样式hook
import genComponentStyleHook from "./util/genComponentStyleHook";
// 统计使用那些变量方法
import statisticToken, { mergeToken, statistic } from "./util/statistic";

// type
// 组件完整的变量
import type { FullToken } from "./util/genComponentStyleHook";
import type {
	// 别名变量
	AliasToken,
	// 别名变量 & 组件的名称
	GlobalToken,
	// 梯度变量
	MapToken,
	// 需要覆盖的样式变量
	OverrideToken,
	// 预设颜色 | 颜色梯度
	PresetColorType,
	// 基础变量
	SeedToken,
} from "./interface";

// 创建主题
// Same as new Theme, but will always return same one if `derivative` not changed.
const defaultTheme = createTheme(defaultDerivative);

// ================================ Context =================================

// 基础变量
export const defaultConfig = {
	// 默认基础变量
	token: defaultSeedToken,
	// 是否生成id
	hashed: true,
};

// 创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件
// 组件主题
export const DesignTokenContext = React.createContext<{
	token: Partial<AliasToken>;
	theme?: Theme<SeedToken, MapToken>;
	components?: OverrideToken;
	hashed?: string | boolean;
}>(defaultConfig);

// ================================ Hook =================================
// 获取全局token
export function useToken(): [Theme<SeedToken, MapToken>, GlobalToken, string] {
	const {
		// 自定义的主题
		token: rootDesignToken,
		// 是否生成id
		hashed,
		// 主题
		theme,
		// 修改组件变量
		components,
	} = React.useContext(DesignTokenContext);

	// 版本
	const salt = `${version}-${hashed || ""}`;

	// 合并主题
	const mergedTheme = theme || defaultTheme;

	// 保存主题全局共享生成对应的 token 和 id
	const [token, hashId] = useCacheToken<GlobalToken, SeedToken>(
		// 主题实体->合并主题
		mergedTheme,
		// 令牌列表，用于缓存
		[
			// 基础变量
			defaultSeedToken,
			// 自定义的主题
			rootDesignToken,
		],
		// 附加配置
		{
			// 版本
			salt,
			// 覆盖
			override: { override: rootDesignToken, ...components },
			// 格式化token
			formatToken,
		},
	);

	return [
		// 合并主题
		mergedTheme,
		// 主题变量
		token,
		// 主题变量id
		hashed ? hashId : "",
	];
}

// 组件最终样式
export type UseComponentStyleResult = [
	(node: React.ReactNode) => React.ReactElement,
	string,
];

// 生成样式
export type GenerateStyle<
	ComponentToken extends object = AliasToken,
	ReturnType = CSSInterpolation,
> = (token: ComponentToken) => ReturnType;

export type {
	// 基础变量
	SeedToken,
	// 别名变量
	AliasToken,
	// 预设颜色类型
	PresetColorType,
	// 组件完整的变量
	FullToken,
};

export {
	// 预设颜色
	presetColors,
	// statistic.tsx
	// 统计使用了那些公共变量对象
	statistic,
	// 用于统计使用了那些公共变量
	statisticToken,
	// 合并变量
	mergeToken,
	// hooks
	// 向全局样式表注册一个样式
	useStyleRegister,
	// 整理组件样式hook
	genComponentStyleHook,
};

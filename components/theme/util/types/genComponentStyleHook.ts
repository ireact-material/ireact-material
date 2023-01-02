import type { ComponentTokenMap, GlobalToken } from "../../types";

// 组件令牌
export type OverrideTokenWithoutDerivative = ComponentTokenMap;

// 需要覆盖的组件 key
export type OverrideComponent = keyof OverrideTokenWithoutDerivative;

// 全局组建变量
export type GlobalTokenWithComponent<ComponentName extends OverrideComponent> =
	GlobalToken & ComponentTokenMap[ComponentName];

// 样式class
export interface StyleInfo<ComponentName extends OverrideComponent> {
	// 主题id
	hashId: string;
	// 前缀
	prefixCls: string;
	// root 别名 -> ireact
	rootPrefixCls: string;
	// 图标class
	iconPrefixCls: string;
	// 覆盖组件变量
	overrideComponentToken: ComponentTokenMap[ComponentName];
}

// 合并的class变量
export type TokenWithCommonCls<T> = T & {
	/** Wrap component class with `.` prefix */
	componentCls: string;
	/** Origin prefix which do not have `.` prefix */
	prefixCls: string;
	/** Wrap icon class with `.` prefix */
	iconCls: string;
	/** Wrap ant prefixCls class with `.` prefix */
	ireactCls: string;
};

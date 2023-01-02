import * as React from "react";

// type
import type { ConfigConsumerProps } from "./types/context";

// 默认icon class name
export const defaultIconPrefixCls = "ireact-icon";

// 设置前缀class
const defaultGetPrefixCls = (
	suffixCls?: string,
	customizePrefixCls?: string,
) => {
	// 有自定义前缀
	if (customizePrefixCls) {
		return customizePrefixCls;
	}

	// 有后缀 ? ireact-设置的后缀 : ireact
	return suffixCls ? `ireact-${suffixCls}` : "ireact";
};

// Do not pass `defaultRenderEmpty` here since it will cause circular dependency.
// 创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，
// 这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值
export const ConfigContext = React.createContext<ConfigConsumerProps>({
	// 设置前缀class
	getPrefixCls: defaultGetPrefixCls,
	// 默认icon class name
	iconPrefixCls: defaultIconPrefixCls,
});

export const { Consumer: ConfigConsumer } = ConfigContext;

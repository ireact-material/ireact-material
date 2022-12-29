import * as React from "react";

// 默认icon class name
export const defaultIconPrefixCls = "ireacticon";

// 主题颜色
export interface Theme {
	primaryColor?: string;
	infoColor?: string;
	successColor?: string;
	processingColor?: string;
	errorColor?: string;
	warningColor?: string;
}

export interface ConfigConsumerProps {
	rootPrefixCls?: string;
	iconPrefixCls: string;

	getTargetContainer?: () => HTMLElement;
	getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}

const defaultGetPrefixCls = (
	suffixCls?: string,
	customizePrefixCls?: string,
) => {
	if (customizePrefixCls) {
		return customizePrefixCls;
	}

	return suffixCls ? `ireact-${suffixCls}` : "ireact";
};

// Do not pass `defaultRenderEmpty` here since it will cause circular dependency.
export const ConfigContext = React.createContext<ConfigConsumerProps>({
	// 为没有 provider 的 Context 提供默认函数
	getPrefixCls: defaultGetPrefixCls,
	iconPrefixCls: defaultIconPrefixCls,
});

export const { Consumer: ConfigConsumer } = ConfigContext;

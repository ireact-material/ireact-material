// 全局化配置props
export interface ConfigConsumerProps {
	// 设置统一样式前缀
	rootPrefixCls?: string;
	// 设置图标统一样式前缀
	iconPrefixCls: string;

	// 配置滚动监听容器
	getTargetContainer?: () => HTMLElement;
	// 设置前缀class
	getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}

// 主题颜色
export interface Theme {
	// primaryColor?: string;
	// infoColor?: string;
	// successColor?: string;
	// processingColor?: string;
	// errorColor?: string;
	// warningColor?: string;
}

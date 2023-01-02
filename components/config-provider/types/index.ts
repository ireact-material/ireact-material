import type {
	ConfigConsumerProps,
	ThemeConfig,
	CSPConfig,
	DirectionType,
} from "./context";
import type { Locale } from "../../locale";
import type { SizeType } from "./sizeContext";

// 全局化配置
export interface ConfigProviderProps {
	// 配置滚动监听容器
	getTargetContainer?: () => HTMLElement | Window;

	// 子节点
	children?: React.ReactNode;
	// 设置图标统一样式前缀
	iconPrefixCls?: string;
	// 设置统一样式前缀
	prefixCls?: string;
	// 设置主题
	theme?: ThemeConfig;
	// 动态样式
	csp?: CSPConfig;
	// 设置为 false 时，移除按钮中 2 个汉字之间的空格
	autoInsertSpaceInButton?: boolean;
	// 语言包配置
	locale?: Locale;
	// 设置文本展示方向
	direction?: DirectionType;
	// 设置 Space组件 的 size
	space?: {
		size?: SizeType | number;
	};
	// 设置 false 时关闭虚拟滚动
	virtual?: boolean;
	// 下拉菜单和选择器同宽。默认将设置 min-width，
	// 当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动
	dropdownMatchSelectWidth?: boolean;
}

// 传递到子组件的配置
export interface ProviderChildrenProps extends ConfigProviderProps {
	// 全局化配置props
	parentContext: ConfigConsumerProps;
	// 语言包配置
	legacyLocale: Locale;
}

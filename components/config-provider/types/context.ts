import type { DerivativeFunc } from "@ant-design/cssinjs";
import type {
	AliasToken,
	MapToken,
	OverrideToken,
	SeedToken,
} from "../../theme/types";
// import type { RenderEmptyHandler } from './defaultRenderEmpty';

// 全局化配置props
export interface ConfigConsumerProps {
	// 设置统一样式前缀
	rootPrefixCls?: string;
	// 设置图标统一样式前缀
	iconPrefixCls: string;
	// 动态样式
	csp?: CSPConfig;
	// 设置主题
	theme?: ThemeConfig;

	// 配置滚动监听容器
	getTargetContainer?: () => HTMLElement;
	// 设置前缀class
	getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
	// 弹出框（Select, Tooltip, Menu 等等）渲染父节点，默认渲染到 body 上。
	// getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
	// 自定义组件空状态
	// renderEmpty?: RenderEmptyHandler;
	// pageHeader?: {
	// 	ghost: boolean;
	// };
	// 设置 Input 组件的通用属性
	// input?: {
	// 	autoComplete?: string;
	// };
	// 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true
	// pagination?: {
	// 	showSizeChanger?: boolean;
	// };
	// 设置 Form 组件的通用属性
	// form?: {
	// 	requiredMark?: RequiredMark;
	// 	colon?: boolean;
	// };
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

// 用于修改 Seed Token 到 Map Token 的算法
export type MappingAlgorithm = DerivativeFunc<SeedToken, MapToken>;

// 主题配置
export interface ThemeConfig {
	// 用于修改 Design Token
	token?: Partial<AliasToken>;
	// 用于修改各个组件的 Component Token 以及覆盖该组件消费的 Alias Token
	components?: OverrideToken;
	// 用于修改 Seed Token 到 Map Token 的算法
	algorithm?: MappingAlgorithm | MappingAlgorithm[];
	// 样式id
	hashed?: boolean;
	// 继承上层 ConfigProvider 中配置的主题
	inherit?: boolean;
}

// 动态样式
export interface CSPConfig {
	nonce?: string;
}

// 设置文本展示方向
export type DirectionType = "ltr" | "rtl" | undefined;

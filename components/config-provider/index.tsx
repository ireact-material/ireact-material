import * as React from "react";
import type { ReactElement } from "react";
import useMemo from "rc-util/lib/hooks/useMemo";

// 全局化配置context
import { ConfigContext, ConfigConsumer, defaultIconPrefixCls } from "./context";

// 设置样式
import useStyle from "./style";

// 多语言
import LocaleReceiver from "../locale/localeReceiver";

// 生成主题
import { registerTheme } from "./cssVariables";

// 尺寸大小
import SizeContext from "./sizeContext";

// 合并主题
import useTheme from "./hooks/useTheme";

// type
// 全局化配置props
import type { ConfigConsumerProps, Theme } from "./types/context";
// type
import type {
	// 全局化配置
	ConfigProviderProps,
	// 传递到子组件的配置
	ProviderChildrenProps,
} from "./types/index";

export { ConfigContext, ConfigConsumerProps };

// 默认统一样式前缀
export const defaultPrefixCls = "ireact";

// These props is used by `useContext` directly in sub component
const PASSED_PROPS: Exclude<
	keyof ConfigConsumerProps,
	"rootPrefixCls" | "getPrefixCls"
>[] = [
	"getTargetContainer",
	// 'getPopupContainer',
	// 'renderEmpty',
	// 'pageHeader',
	// 'input',
	// 'pagination',
	// 'form',
	// 'select',
];

// 统一样式前缀
let globalPrefixCls: string;
// 图标统一样式前缀
let globalIconPrefixCls: string;

// 获取统一样式前缀
function getGlobalPrefixCls() {
	return globalPrefixCls || defaultPrefixCls;
}

// 获取图标统一样式前缀
function getGlobalIconPrefixCls() {
	return globalIconPrefixCls || defaultIconPrefixCls;
}

// 设置全局配置
const setGlobalConfig = ({
	// 设置统一样式前缀
	prefixCls,
	// 设置图标统一样式前缀
	iconPrefixCls,
	// 设置主题
	theme,
}: Pick<ConfigProviderProps, "prefixCls" | "iconPrefixCls"> & {
	theme?: Theme;
}) => {
	// 设置统一样式前缀
	if (prefixCls !== undefined) {
		globalPrefixCls = prefixCls;
	}

	// 设置图标统一样式前缀
	if (iconPrefixCls !== undefined) {
		globalIconPrefixCls = iconPrefixCls;
	}

	// 是否有主题
	if (theme) {
		registerTheme(getGlobalPrefixCls(), theme);
	}
};

// 设置全局配置
export const globalConfig = () => ({
	// 获取统一样式前缀
	getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
		// 自定义前缀
		if (customizePrefixCls) {
			return customizePrefixCls;
		}

		// 有设置后缀
		return suffixCls
			? `${getGlobalPrefixCls()}-${suffixCls}`
			: getGlobalPrefixCls();
	},
	// 获取图标统一样式前缀
	getIconPrefixCls: getGlobalIconPrefixCls,
	// 设置根组件样式前缀
	getRootPrefixCls: () => {
		// 如果提供了全局 PrefixCls 则使用它
		if (globalPrefixCls) {
			return globalPrefixCls;
		}

		// 使用默认 PrefixCls
		return getGlobalPrefixCls();
	},
});

// 传递到子组件
const ProviderChildren: React.FC<ProviderChildrenProps> = (props) => {
	const {
		// 子节点
		children,
		// props配置
		parentContext,
		// icon class
		iconPrefixCls: customIconPrefixCls,
		// 动态样式
		csp: customCsp,
		// 设置为 false 时，移除按钮中 2 个汉字之间的空格
		autoInsertSpaceInButton,
		// 语言包配置
		locale,
		// 语言包配置
		legacyLocale,
		// 设置文本展示方向
		direction,
		// 设置 Space组件 的 size
		space,
		// 设置 false 时关闭虚拟滚动
		virtual,
		// 下拉菜单和选择器同宽。默认将设置 min-width，
		// 当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动
		dropdownMatchSelectWidth,
		// 设置主题
		theme,
	} = props;

	// 获取统一样式前缀 回调函数仅在某个依赖项改变时才会更新
	const getPrefixCls = React.useCallback(
		// 要缓存的函数值
		(suffixCls: string, customizePrefixCls?: string) => {
			const { prefixCls } = props;

			// 自定义前缀
			if (customizePrefixCls) {
				return customizePrefixCls;
			}

			const mergedPrefixCls = prefixCls || parentContext.getPrefixCls("");

			// 有设置后缀
			return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
		},
		// 只要依赖项数组不改变函数不会重新渲染
		[parentContext.getPrefixCls, props.prefixCls],
	);

	// icon class
	const iconPrefixCls =
		customIconPrefixCls || parentContext.iconPrefixCls || defaultIconPrefixCls;
	const shouldWrapSSR = iconPrefixCls !== parentContext.iconPrefixCls;

	// CSPConfig
	const csp = customCsp || parentContext.csp;

	// 合并主题
	const mergedTheme = useTheme(theme, parentContext.theme);

	// 基础配置
	const baseConfig = {
		csp,
		autoInsertSpaceInButton,
		locale: locale || legacyLocale,
		direction,
		space,
		virtual,
		dropdownMatchSelectWidth,
		getPrefixCls,
		iconPrefixCls,
		theme: mergedTheme,
	};

	// props配置
	const config = {
		...parentContext,
	};

	// 合并基础配置到 config
	Object.keys(baseConfig).forEach((key: keyof typeof baseConfig) => {
		if (baseConfig[key] !== undefined) {
			(config as any)[key] = baseConfig[key];
		}
	});

	// 将 `useContext` 使用的 props 直接传递给子组件
	// 合并到props配置
	PASSED_PROPS.forEach((propName) => {
		const propValue = props[propName];
		if (propValue) {
			(config as any)[propName] = propValue;
		}
	});

	// 防止在 ConfigProvider 更改语言环境时刷新子组件
	// 只有更新的方法返回true才会触发要缓存的函数
	const memoedConfig = useMemo(
		() => config,
		// 依赖数组
		config,
		// 触发更新的方法
		(prevConfig, currentConfig) => {
			// 上一个 props配置
			const prevKeys = Object.keys(prevConfig) as Array<keyof typeof config>;

			// 当前 props配置
			const currentKeys = Object.keys(currentConfig) as Array<
				keyof typeof config
			>;

			// 对比变化
			return (
				prevKeys.length !== currentKeys.length ||
				prevKeys.some((key) => prevConfig[key] !== currentConfig[key])
			);
		},
	);

	// 渲染样式
	const wrapSSR = useStyle(iconPrefixCls);

	// 渲染子节点
	const childNode = shouldWrapSSR
		? wrapSSR(children as ReactElement)
		: children;

	return (
		<ConfigContext.Provider value={memoedConfig}>
			{childNode}
		</ConfigContext.Provider>
	);
};

// 全局化配置
const ConfigProvider: React.FC<ConfigProviderProps> & {
	ConfigContext: typeof ConfigContext;
	SizeContext: typeof SizeContext;
	config: typeof setGlobalConfig;
} = (props) => (
	<LocaleReceiver>
		{(_, __, legacyLocale) => (
			<ConfigConsumer>
				{(context) => (
					<ProviderChildren
						parentContext={context}
						legacyLocale={legacyLocale}
						{...props}
					/>
				)}
			</ConfigConsumer>
		)}
	</LocaleReceiver>
);

// 全局化配置context
ConfigProvider.ConfigContext = ConfigContext;
// 尺寸大小
ConfigProvider.SizeContext = SizeContext;
// 设置全局配置
ConfigProvider.config = setGlobalConfig;

export default ConfigProvider;

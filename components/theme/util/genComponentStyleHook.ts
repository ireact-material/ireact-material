/* eslint-disable no-redeclare */
import type { CSSInterpolation } from "@ant-design/cssinjs";
import { useStyleRegister } from "@ant-design/cssinjs";
import { useContext } from "react";

// 设置公共样式 | 注册a标签样式
import { genCommonStyle, genLinkStyle } from "../../style";
// 创建一个 Context 对象
import { ConfigContext } from "../../config-provider/context";

// 合并数据 | 用于统计使用了那些公共变量
import { mergeToken, statisticToken, useToken } from "../internal";

// type
import type { UseComponentStyleResult } from "../internal";
import type { GlobalToken } from "../types";
import type {
	// 组件令牌
	OverrideComponent,
	// 全局组建变量
	GlobalTokenWithComponent,
	// 组件令牌
	OverrideTokenWithoutDerivative,
	// 样式class
	StyleInfo,
	// 合并的class变量
	TokenWithCommonCls,
} from "./types/genComponentStyleHook";

// 令牌
export type FullToken<ComponentName extends OverrideComponent> =
	TokenWithCommonCls<GlobalTokenWithComponent<ComponentName>>;

// 整理组件样式hook
export default function genComponentStyleHook<
	// 组件名称
	ComponentName extends OverrideComponent,
>(
	// 组件名称
	component: ComponentName,
	// 样式方法
	styleFn: (
		// 组件名称
		token: FullToken<ComponentName>,
		// 样式class
		info: StyleInfo<ComponentName>,
	) => CSSInterpolation,
	// 获取对应令牌的数据
	getDefaultToken?:
		| OverrideTokenWithoutDerivative[ComponentName]
		| ((token: GlobalToken) => OverrideTokenWithoutDerivative[ComponentName]),
) {
	// 组件最终样式
	return (prefixCls: string): UseComponentStyleResult => {
		const [
			// 主题
			theme,
			// styles变量
			token,
			// 主题id
			hashId,
		] = useToken();

		// 接受上下文对象 返回该上下文的当前上下文值
		const { getPrefixCls, iconPrefixCls } = useContext(ConfigContext);

		// root class 名称 -> ireact
		const rootPrefixCls = getPrefixCls();

		// 将样式注册到全局样式表->注册a链接
		useStyleRegister(
			{ theme, token, hashId, path: ["Shared", rootPrefixCls] },
			() => [
				{
					// 注册a标签样式
					"&": genLinkStyle(token),
				},
			],
		);

		// 将样式注册到全局样式表
		return [
			useStyleRegister(
				{ theme, token, hashId, path: [component, prefixCls, iconPrefixCls] },
				() => {
					const { token: proxyToken, flush } = statisticToken(token);

					// 默认组件变量
					const defaultComponentToken =
						typeof getDefaultToken === "function"
							? getDefaultToken(proxyToken)
							: getDefaultToken;

					// 合并组件变量
					const mergedComponentToken = {
						...defaultComponentToken,
						...token[component],
					};

					// 组件class
					const componentCls = `.${prefixCls}`;

					// 合并的全局styles变量
					const mergedToken = mergeToken<
						TokenWithCommonCls<GlobalTokenWithComponent<OverrideComponent>>
					>(
						// styles变量
						proxyToken,
						{
							// 组件class
							componentCls,
							// 前缀
							prefixCls,
							// 图标class
							iconCls: `.${iconPrefixCls}`,
							// root 别名 -> ireact
							ireactCls: `.${rootPrefixCls}`,
						},
						// 合并组件变量
						mergedComponentToken,
					);

					// 自定义样式
					const styleInterpolation = styleFn(
						mergedToken as unknown as FullToken<ComponentName>,
						{
							// 主题id
							hashId,
							// 前缀
							prefixCls,
							// root 别名 -> ireact
							rootPrefixCls,
							// 图标class
							iconPrefixCls,
							// 覆盖组件变量
							overrideComponentToken: token[component],
						},
					);

					// 统计使用了那些公共变量->生产环境生效
					flush(component, mergedComponentToken);

					return [
						// 设置公共样式
						genCommonStyle(token, prefixCls),
						// 自定义样式
						styleInterpolation,
					];
				},
			),
			// 主题id
			hashId,
		];
	};
}

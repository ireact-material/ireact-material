import React from "react";
import { useToken } from "../theme/internal";

// type

// 别名变量 & 组件的名称
import type { GlobalToken } from "../theme/types/index";

// 响应尺寸
export type Breakpoint = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";

// 响应尺寸数组
export const responsiveArray: Breakpoint[] = [
	"xxl",
	"xl",
	"lg",
	"md",
	"sm",
	"xs",
];

// 屏幕信息
export type ScreenMap = Partial<Record<Breakpoint, boolean>>;

// 响应尺寸数对象
export type BreakpointMap = Record<Breakpoint, string>;

// 订阅函数
type SubscribeFunc = (screens: ScreenMap) => void;

/**
 * 验证响应尺寸
 * For each breakpoint : screenMin <= screen <= screenMax and screenMax <= nextScreenMin
 *
 * @param token 获取全局token
 * @returns 获取全局token
 */
const validateBreakpoints = (token: GlobalToken) => {
	const indexableToken: any = token;

	// 响应尺寸数组
	const revBreakpoints = [...responsiveArray].reverse();

	revBreakpoints.forEach((breakpoint: Breakpoint, index: number) => {
		// 尺寸转换为大写
		const breakpointUpper = breakpoint.toUpperCase();
		// 视图最小尺寸
		const screenMin = `screen${breakpointUpper}Min`;
		// 视图基础尺寸
		const screen = `screen${breakpointUpper}`;

		// 不是 视图最小尺寸 <= 视图基础尺寸
		if (!(indexableToken[screenMin] <= indexableToken[screen])) {
			throw new Error(
				`${screenMin}<=${screen} fails : !(${indexableToken[screenMin]}<=${indexableToken[screen]})`,
			);
		}

		// 设置最大尺寸
		if (index < revBreakpoints.length - 1) {
			const screenMax = `screen${breakpointUpper}Max`;

			// 不是 视图基础尺寸 <= 视图最大尺寸
			if (!(indexableToken[screen] <= indexableToken[screenMax])) {
				throw new Error(
					`${screen}<=${screenMax} fails : !(${indexableToken[screen]}<=${indexableToken[screenMax]})`,
				);
			}

			// 下一个尺寸
			const nextBreakpointUpperMin: string =
				revBreakpoints[index + 1].toUpperCase();
			const nextScreenMin = `screen${nextBreakpointUpperMin}Min`;

			// 不是 视图最大尺寸 <= 下一个试图最小尺寸
			if (!(indexableToken[screenMax] <= indexableToken[nextScreenMin])) {
				throw new Error(
					`${screenMax}<=${nextScreenMin} fails : !(${indexableToken[screenMax]}<=${indexableToken[nextScreenMin]})`,
				);
			}
		}
	});

	return token;
};

/**
 * 需要监听的数据
 *
 * @param token
 * @returns 响应尺寸对象
 */
const getResponsiveMap = (token: GlobalToken): BreakpointMap => ({
	// 屏幕 < 576px
	xs: `(max-width: ${token.screenXSMax}px)`,
	// 屏幕 ≥ 576px
	sm: `(min-width: ${token.screenSM}px)`,
	// 屏幕 ≥ 768px
	md: `(min-width: ${token.screenMD}px)`,
	// 屏幕 ≥ 992px
	lg: `(min-width: ${token.screenLG}px)`,
	// 屏幕 ≥ 1200px
	xl: `(min-width: ${token.screenXL}px)`,
	// 屏幕 ≥ 1600px
	xxl: `(min-width: ${token.screenXXL}px)`,
});

// 监听视图变化
export default function useResponsiveObserver() {
	// 获取全局token
	const [, token] = useToken();

	const responsiveMap: BreakpointMap = getResponsiveMap(
		validateBreakpoints(token),
	);

	// 为了避免重复创建实例，在这里添加 `useMemo`
	// useMemo 调用您的函数并缓存其结果
	return React.useMemo(() => {
		// 订阅者
		const subscribers = new Map<Number, SubscribeFunc>();

		let subUid = -1;
		// 视图对象
		let screens = {};

		return {
			// 匹配事件
			matchHandlers: {} as {
				[prop: string]: {
					// 媒体查询列表
					mql: MediaQueryList;
					listener:
						| ((this: MediaQueryList, ev: MediaQueryListEvent) => any)
						| null;
				};
			},
			// 派发事件
			dispatch(screenMap: ScreenMap) {
				screens = screenMap;
				subscribers.forEach((func) => func(screens));

				return subscribers.size >= 1;
			},
			// 订阅事件
			subscribe(func: SubscribeFunc): number {
				// 如果没有派发注册事件
				if (!subscribers.size) {
					this.register();
				}

				subUid += 1;

				// 设置订阅者
				subscribers.set(subUid, func);
				func(screens);

				return subUid;
			},
			// 删除订阅者
			unsubscribe(paramToken: number) {
				subscribers.delete(paramToken);

				if (!subscribers.size) {
					this.unregister();
				}
			},
			// 注册事件
			register() {
				Object.keys(responsiveMap).forEach((screen: Breakpoint) => {
					// 匹配媒体查询
					const matchMediaQuery = responsiveMap[screen];
					// 事件
					const listener = ({ matches }: { matches: boolean }) => {
						this.dispatch({
							...screens,
							[screen]: matches,
						});
					};

					// 媒体查询字符串解析后的结果
					const mql = window.matchMedia(matchMediaQuery);
					// 添加一个新的监听器函数，该函数在媒体查询的结果发生变化时执行
					mql.addListener(listener);

					// 保存到matchHandlers对象
					this.matchHandlers[matchMediaQuery] = {
						mql,
						listener,
					};

					listener(mql);
				});
			},
			// 销毁注册事件
			unregister() {
				Object.keys(responsiveMap).forEach((screen: Breakpoint) => {
					// 匹配媒体查询
					const matchMediaQuery = responsiveMap[screen];
					// 匹配事件
					const handler = this.matchHandlers[matchMediaQuery];
					// 删除事件
					handler?.mql.removeListener(handler?.listener);
				});
			},
			responsiveMap,
		};
	}, [token]);
}

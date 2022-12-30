declare const CSSINJS_STATISTIC: any;

// 不是生产环境
const enableStatistic =
	process.env.NODE_ENV !== "production" ||
	typeof CSSINJS_STATISTIC !== "undefined";

// 记录
let recording = true;

/**
 * 此函数在生产中将作为 `Object.assign` 执行
 * 开发环境会使用 Object.defineProperty:get 来传递所有的值访问
 * 支持使用别名令牌的统计字段使用
 * @param objs
 * @returns
 */
export function mergeToken<T extends object>(...objs: Partial<T>[]): T {
	// 不是生产环境
	if (!enableStatistic) {
		return Object.assign({}, ...objs);
	}

	// 不开启记录
	recording = false;

	const ret = {} as T;

	objs.forEach((obj) => {
		const keys = Object.keys(obj);

		keys.forEach((key) => {
			Object.defineProperty(ret, key, {
				configurable: true,
				enumerable: true,
				get: () => (obj as any)[key],
			});
		});
	});

	// 开启记录
	recording = true;

	return ret;
}

// 统计使用了那些公共变量对象
export const statistic: Record<
	string,
	{ global: string[]; component: Record<string, string | number> }
> = {};

function noop() {}

/**
 * 用于统计使用了那些公共变量
 *
 * @param token
 * @returns
 */
export default function statisticToken<T extends object>(token: T) {
	// 公共变量 key name
	let tokenKeys: Set<string> | undefined;

	let proxy = token;

	let flush: (
		componentName: string,
		componentToken: Record<string, string | number>,
	) => void = noop;

	// 启用统计
	if (enableStatistic) {
		// 存储任何类型的唯一值
		tokenKeys = new Set<string>();

		proxy = new Proxy(token, {
			get(obj: any, prop: any) {
				// 可以统计
				if (recording) {
					tokenKeys!.add(prop);
				}

				return obj[prop];
			},
		});

		// 统计方法
		flush = (
			// 组件名称
			componentName,
			// 组件使用的公共变量
			componentToken,
		) => {
			statistic[componentName] = {
				global: Array.from(tokenKeys!),
				component: componentToken,
			};
		};
	}

	return { token: proxy, keys: tokenKeys, flush };
}

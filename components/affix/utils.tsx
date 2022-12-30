import addEventListener from "rc-util/lib/Dom/addEventListener";

import type { BindElement, ObserverInstance } from "./types";

// 监听的事件
const TRIGGER_EVENTS = [
	"resize",
	"scroll",
	"touchstart",
	"touchmove",
	"touchend",
	"pageshow",
	"load",
];

// 需要监听事件的数组
let observerInstances: ObserverInstance[] = [];

/**
 * 添加节点事件
 *
 * @param target 目标节点
 * @param affix 当前节点
 * @returns
 */
export function addObserveTarget<T>(
	target: HTMLElement | Window | null,
	affix?: T,
): void {
	// 没有目标节点
	if (!target) {
		return;
	}

	// 实例
	let instance: ObserverInstance | undefined = observerInstances.find(
		(item) => item.target === target,
	);

	// 添加需要监听的元素
	if (instance) {
		instance.affixList.push(affix);
	}
	// 初始化事件对象
	else {
		instance = {
			// 目标节点
			target,
			// 当前节点数组
			affixList: [affix],
			// 监听的事件对象
			eventHandlers: {},
		};
	}

	// 添加到需要监听事件的数组
	observerInstances.push(instance);

	// 添加事件
	TRIGGER_EVENTS.forEach((eventName) => {
		instance!.eventHandlers[eventName] = addEventListener(
			target,
			eventName,
			() => {
				instance!.affixList.forEach((targetAffix) => {
					// 更新视图位置
					targetAffix.lazyUpdatePosition();
				});
			},
		);
	});
}

/**
 * 删除节点事件
 *
 * @param affix 当前节点
 */
export function removeObserveTarget<T>(affix: T): void {
	// 当前节点实例
	const observerInstance = observerInstances.find((observerInstancesItem) => {
		// 监听事件数组中是否有当前节点
		const hasAffix = observerInstancesItem.affixList.some(
			(item) => item === affix,
		);

		// 移除当前节点
		if (hasAffix) {
			observerInstancesItem.affixList = observerInstancesItem.affixList.filter(
				(item) => item !== affix,
			);
		}

		// 当前节点
		return hasAffix;
	});

	// 找到当前需要删除的事件
	if (observerInstance && observerInstance.affixList.length === 0) {
		observerInstances = observerInstances.filter(
			(item) => item !== observerInstance,
		);

		// 删除事件
		TRIGGER_EVENTS.forEach((eventName) => {
			const handler = observerInstance.eventHandlers[eventName];

			// remove
			if (handler && handler.remove) {
				handler.remove();
			}
		});
	}
}

/**
 * 获取目标节点的元素大小及其相对于视口的位置的信息 top和bottom
 *
 * @param target 当前节点
 * @returns
 */
export function getTargetRect(target: BindElement): DOMRect {
	// 是否是window节点
	return target !== window
		? // 不是则使用 getBoundingClientRect
		  (target as HTMLElement).getBoundingClientRect()
		: // 否者自定义对象
		  ({ top: 0, bottom: window.innerHeight } as DOMRect);
}

/**
 * 获取固定到顶部的位置
 *
 * @param placeholderReact 占位节点
 * @param targetRect 目标节点
 * @param offsetTop 固定位置
 * @returns
 */
export function getFixedTop(
	placeholderReact: DOMRect,
	targetRect: DOMRect,
	offsetTop?: number,
) {
	// 目标节点 top > 占位节点 top - 固定位置
	if (
		offsetTop !== undefined &&
		targetRect.top > placeholderReact.top - offsetTop
	) {
		// 距离窗口顶部达到指定偏移量后触发 + 目标元素 top
		return offsetTop + targetRect.top;
	}

	return undefined;
}

/**
 * 获取固定到底部的位置
 *
 * @param placeholderReact 占位节点
 * @param targetRect 目标节点
 * @param offsetBottom 固定位置
 * @returns
 */
export function getFixedBottom(
	placeholderReact: DOMRect,
	targetRect: DOMRect,
	offsetBottom?: number,
) {
	// 目标节点 bottom < 占位节点 bottom + 固定位置
	if (
		offsetBottom !== undefined &&
		targetRect.bottom < placeholderReact.bottom + offsetBottom
	) {
		// innerHeight - 目标元素 bottom
		const targetBottomOffset = window.innerHeight - targetRect.bottom;

		// 距离窗口底部达到指定偏移量后触发 + targetBottomOffset
		return offsetBottom + targetBottomOffset;
	}

	return undefined;
}

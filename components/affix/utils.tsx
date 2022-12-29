import addEventListener from "rc-util/lib/Dom/addEventListener";

import type { BindElement, ObserverEntity } from "./types";

const TRIGGER_EVENTS = [
	"resize",
	"scroll",
	"touchstart",
	"touchmove",
	"touchend",
	"pageshow",
	"load",
];

let observerEntities: ObserverEntity[] = [];

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
	if (!target) {
		return;
	}

	let entity: ObserverEntity | undefined = observerEntities.find(
		(item) => item.target === target,
	);

	// 添加需要监听的元素
	if (entity) {
		entity.affixList.push(affix);
	}
	// 初始化事件对象
	else {
		entity = {
			target,
			affixList: [affix],
			eventHandlers: {},
		};
	}

	// 添加事件
	TRIGGER_EVENTS.forEach((eventName) => {
		entity!.eventHandlers[eventName] = addEventListener(
			target,
			eventName,
			() => {
				entity!.affixList.forEach((targetAffix) => {
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
	const observerEntity = observerEntities.find((oriObserverEntity) => {
		const hasAffix = oriObserverEntity.affixList.some((item) => item === affix);

		// 移除元素
		if (hasAffix) {
			oriObserverEntity.affixList = oriObserverEntity.affixList.filter(
				(item) => item !== affix,
			);
		}

		return hasAffix;
	});

	if (observerEntity && observerEntity.affixList.length === 0) {
		observerEntities = observerEntities.filter(
			(item) => item !== observerEntity,
		);

		// 删除事件
		TRIGGER_EVENTS.forEach((eventName) => {
			const handler = observerEntity.eventHandlers[eventName];
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
	return target !== window
		? (target as HTMLElement).getBoundingClientRect()
		: ({ top: 0, bottom: window.innerHeight } as DOMRect);
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
		console.log("11offsetTopoffsetTop2", offsetTop, targetRect.top);
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
		const targetBottomOffset = window.innerHeight - targetRect.bottom;

		return offsetBottom + targetBottomOffset;
	}

	return undefined;
}

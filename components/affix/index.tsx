import * as React from "react";
import ResizeObserver from "rc-resize-observer";
import omit from "rc-util/lib/omit";
import classNames from "classnames";

import { ConfigContext } from "../config-provider";
import throttleByAnimationFrame from "../util/throttleByAnimationFrame";

// 样式
import useStyle from "./style";
import {
	addObserveTarget,
	removeObserveTarget,
	getTargetRect,
	getFixedTop,
	getFixedBottom,
} from "./utils";

// type
import { AffixStatus } from "./types";
import type { AffixProps, InternalAffixProps, AffixState } from "./types";
import type { ConfigConsumerProps } from "../config-provider";

function getDefaultTarget() {
	return typeof window !== "undefined" ? window : null;
}

class Affix extends React.Component<InternalAffixProps, AffixState> {
	state: AffixState = {
		// 状态
		status: AffixStatus.None,
		// 是否固定
		fixed: false,
		// 上一个target
		prevTarget: null,
	};

	// 占位节点
	placeholderNode: HTMLDivElement;

	// 固定元素节点
	fixedNode: HTMLDivElement;

	// setTimeout
	private timeout: NodeJS.Timeout | null;

	context: ConfigConsumerProps;

	// 获取目标节点默认 window
	private getTargetFunc() {
		const { getTargetContainer } = this.context;
		const { target } = this.props;

		if (target !== undefined) {
			return target;
		}

		return getTargetContainer ?? getDefaultTarget;
	}

	componentDidMount() {
		const targetFunc = this.getTargetFunc();

		if (targetFunc) {
			// [Legacy] Wait for parent component ref has its value.
			// We should use target as directly element instead of function which makes element check hard.
			this.timeout = setTimeout(() => {
				// 添加观察目标
				addObserveTarget(targetFunc(), this);
				// 初始化执行一次事件
				this.updatePosition();
			});
		}
	}

	componentDidUpdate(prevProps: AffixProps) {
		const { prevTarget } = this.state;

		const targetFunc = this.getTargetFunc();

		// 新的目标节点
		const newTarget = targetFunc?.() || null;

		if (prevTarget !== newTarget) {
			removeObserveTarget(this);

			// 有新的目标元素
			if (newTarget) {
				// 为新的目标元素添加事件舰艇
				addObserveTarget(newTarget, this);
				// 节流初始化位置
				this.updatePosition();
			}

			// 设置上一个目标元素为 newTarget
			this.setState({
				prevTarget: newTarget,
			});
		}

		// 没有达到固定位置，初始化节点位置
		if (
			prevProps.offsetTop !== this.props.offsetTop ||
			prevProps.offsetBottom !== this.props.offsetBottom
		) {
			// 节流初始化位置
			this.updatePosition();
		}

		// 计算滚动位置
		this.calculateScrollPosition();
	}

	// 初始化状态
	initData = () => {
		this.setState({
			status: AffixStatus.Prepare,
			affixStyle: undefined,
			placeholderStyle: undefined,
		});
	};

	// 获取占位节点
	savePlaceholderNode = (node: HTMLDivElement) => {
		this.placeholderNode = node;
	};

	// 保存固定元素节点
	saveFixedNode = (node: HTMLDivElement) => {
		this.fixedNode = node;
	};

	// 获取滚动顶部固定位置
	getOffsetTop = () => {
		const { offsetBottom, offsetTop } = this.props;

		return offsetBottom === undefined && offsetTop === undefined
			? 0
			: offsetTop;
	};

	// 获取滚动到底部固定位置
	getOffsetBottom = () => this.props.offsetBottom;

	// 节流初始化位置
	updatePosition = throttleByAnimationFrame(() => {
		this.initData();
	});

	// 节流更新位置
	lazyUpdatePosition = throttleByAnimationFrame(() => {
		const targetFunc = this.getTargetFunc();

		const { affixStyle } = this.state;

		// 在测量之前检查位置变化以使 Safari 流畅
		if (targetFunc && affixStyle) {
			const offsetTop = this.getOffsetTop();
			const offsetBottom = this.getOffsetBottom();

			// 目标节点
			const targetNode = targetFunc();

			//  是否有占位节点
			if (targetNode && this.placeholderNode) {
				console.log("---");
			}
		}

		this.initData();
	});

	// 计算滚动位置
	calculateScrollPosition = () => {
		// state
		const { status, fixed } = this.state;

		// 事件
		const { onChange } = this.props;

		const targetFunc = this.getTargetFunc();

		// status !== Prepare || 没有固定节点 || 没有占位节点 || 没有目标节点
		if (
			status !== AffixStatus.Prepare ||
			!this.fixedNode ||
			!this.placeholderNode ||
			!targetFunc
		) {
			return;
		}

		// 获取滚动顶部固定位置
		const offsetTop = this.getOffsetTop();
		// 获取滚动到底部固定位置
		const offsetBottom = this.getOffsetBottom();

		// 没有目标元素
		const targetNode = targetFunc();
		if (!targetNode) {
			return;
		}

		const newState: Partial<AffixState> = {
			status: AffixStatus.None,
		};

		// 获取目标节点的元素大小及其相对于视口的位置的信息
		const targetRect = getTargetRect(targetNode);
		// 获取占位节点的元素大小及其相对于视口的位置的信息
		const placeholderReact = getTargetRect(this.placeholderNode);
		const fixedTop = getFixedTop(placeholderReact, targetRect, offsetTop);
		const fixedBottom = getFixedBottom(
			placeholderReact,
			targetRect,
			offsetBottom,
		);

		// 已经固定了不执行
		if (
			placeholderReact.top === 0 &&
			placeholderReact.left === 0 &&
			placeholderReact.width === 0 &&
			placeholderReact.height === 0
		) {
			return;
		}

		// 固定顶部 || 固定底部
		if (fixedTop !== undefined || fixedBottom !== undefined) {
			// 节点固定
			newState.affixStyle = {
				position: "fixed",
				width: placeholderReact.width,
				height: placeholderReact.height,
			};

			// 设置占位节点尺寸
			newState.placeholderStyle = {
				width: placeholderReact.width,
				height: placeholderReact.height,
			};
			console.log("newState", fixedTop);

			newState.affixStyle.top = fixedTop;
			newState.affixStyle.bottom = fixedBottom;
		}
		// // 固定底部
		// else if (fixedBottom !== undefined) {
		//   // 节点固定
		//   newState.affixStyle = {
		//     position: 'fixed',
		//     top: fixedBottom,
		//     width: placeholderReact.width,
		//     height: placeholderReact.height,
		//   }

		//   // 设置占位节点尺寸
		//   newState.placeholderStyle = {
		//     width: placeholderReact.width,
		//     height: placeholderReact.height,
		//   }
		// }

		// 有设置元素固定节点
		newState.fixed = !!newState.affixStyle;

		// 有监听事件
		if (onChange && fixed !== newState.fixed) {
			onChange(newState.fixed);
		}

		this.setState(newState as AffixState);
	};

	render() {
		// state
		const { affixStyle, placeholderStyle } = this.state;
		const { affixPrefixCls, rootClassName, children } = this.props;

		// 过滤props
		const props = omit(this.props, [
			"prefixCls",
			"offsetTop",
			"offsetBottom",
			"target",
			"onChange",
			"affixPrefixCls",
			"rootClassName",
		]);

		// 固定时的class
		const className = classNames({
			[rootClassName]: !!affixStyle,
			[affixPrefixCls]: !!affixStyle,
		});

		return (
			// 监听节点变化
			<ResizeObserver onResize={this.updatePosition}>
				<div {...props} ref={this.savePlaceholderNode}>
					{/* 占位节点 */}
					{affixStyle && <div style={placeholderStyle} aria-hidden="true" />}
					{/* 需要固定的内容 */}
					<div
						className={className}
						ref={this.saveFixedNode}
						style={affixStyle}
					>
						<ResizeObserver onResize={this.updatePosition}>
							{children}
						</ResizeObserver>
					</div>
				</div>
			</ResizeObserver>
		);
	}
}

const AffixFC = React.forwardRef<Affix, AffixProps>((props, ref) => {
	const { prefixCls: customizePrefixCls } = props;
	const { getPrefixCls } = React.useContext(ConfigContext);

	// 获取样式名称
	const affixPrefixCls = getPrefixCls("affix", customizePrefixCls);

	// 样式
	const [wrapSSR, hashId] = useStyle(affixPrefixCls);

	// 获取组件的props
	const AffixProps: InternalAffixProps = {
		...props,
		affixPrefixCls,
		rootClassName: hashId,
	};

	return wrapSSR(<Affix {...AffixProps} ref={ref} />);
});

if (process.env.NODE_ENV !== "production") {
	AffixFC.displayName = "Affix";
}

export default AffixFC;

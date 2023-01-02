// props
export interface AffixProps {
	// 距离窗口顶部达到指定偏移量后触发
	offsetTop?: number;
	// 距离窗口底部达到指定偏移量后触发
	offsetBottom?: number;
	// 自定义样式
	style?: React.CSSProperties;
	// 固定状态改变时触发的回调函数
	onChange?: (affixed?: boolean) => void;
	// 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数
	target?: () => Window | HTMLElement | null;
	// 外部定义的
	prefixCls?: string;
	// className
	className?: string;
	// 子节点
	children: React.ReactNode;
}

// 内部props方法
export interface InternalAffixProps extends AffixProps {
	// 组件前缀
	affixPrefixCls: string;
	// 根类名
	rootClassName: string;
}

// state

// 枚举status
export enum AffixStatus {
	// 不能执行
	None,
	// 可以执行
	Start,
}

// state类型
export interface AffixState {
	// 固定节点style
	affixStyle?: React.CSSProperties;
	// 占位节点style
	placeholderStyle?: React.CSSProperties;
	// 判断是否可以执行
	status: AffixStatus;
	// 是否固定
	fixed: boolean;
	// 上一个目标节点
	prevTarget: Window | HTMLElement | null;
}

// Observer

// 绑定事件的节点
export type BindElement = HTMLElement | Window | null | undefined;

export interface ObserverInstance {
	// 目标节点
	target: HTMLElement | Window;
	// 当前节点数组
	affixList: any[];
	// 监听的事件对象
	eventHandlers: { [eventName: string]: any };
}

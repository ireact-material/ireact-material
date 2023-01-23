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

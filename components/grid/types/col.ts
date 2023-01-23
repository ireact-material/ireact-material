import type * as React from 'react';

type ColSpanType = number | string;
export type FlexType = number | 'none' | 'auto' | string;

// col props
export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  // 栅格占位格数
  span?: ColSpanType;
  // 栅格顺序
  order?: ColSpanType;
  // 栅格左侧的间隔格数，间隔内不可以有栅格
  offset?: ColSpanType;
  // 栅格向右移动格数
  push?: ColSpanType;
  // 栅格向左移动格数
  pull?: ColSpanType;
  // flex 布局属性
  flex?: FlexType;
  xs?: ColSpanType | ColSize;
  sm?: ColSpanType | ColSize;
  md?: ColSpanType | ColSize;
  lg?: ColSpanType | ColSize;
  xl?: ColSpanType | ColSize;
  xxl?: ColSpanType | ColSize;
}

// col size
export interface ColSize {
  flex?: FlexType;
  span?: ColSpanType;
  order?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
}

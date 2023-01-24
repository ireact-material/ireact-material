import type * as React from 'react';
import type { Breakpoint } from '../../util/responsiveObserver';

const RowJustify = [
  'start',
  'end',
  'center',
  'space-around',
  'space-between',
  'space-evenly',
] as const;

type ResponsiveJustify = ResponsiveLike<(typeof RowJustify)[number]>;

type Responsive = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

type ResponsiveLike<T> = {
  [key in Responsive]?: T;
};

const RowAligns = ['top', 'middle', 'bottom', 'stretch'] as const;
type ResponsiveAligns = ResponsiveLike<(typeof RowAligns)[number]>;

// row props
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  // 是否自动换行
  wrap?: boolean;
  // 栅格间隔
  gutter?: Gutter | [Gutter, Gutter];
  // 水平排列方式
  justify?: (typeof RowJustify)[number] | ResponsiveJustify;
  // 垂直对齐方式
  align?: (typeof RowAligns)[number] | ResponsiveAligns;
}

// 栅格间隔
export type Gutter = number | undefined | Partial<Record<Breakpoint, number>>;

// 间隔
export type Gap = number | undefined;

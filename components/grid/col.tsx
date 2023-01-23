import * as React from 'react';
import classNames from 'classnames';

// 全局化配置
import { ConfigContext } from '../config-provider';
// row配置
import RowContext from './rowContext';
// col样式
import { useColStyle } from './style';

// type
import type { ColProps, ColSize, FlexType } from './types/col';

// 尺寸大小
const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

// 格式化flex布局
function parseFlex(flex: FlexType): string {
  // number
  if (typeof flex === 'number') {
    return `${flex} ${flex} auto`;
  }

  // 有单位
  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
    return `0 0 ${flex}`;
  }

  return flex;
}

const Col = React.forwardRef<HTMLDivElement, ColProps>((props, ref) => {
  const {
    // 获取前缀
    getPrefixCls,
    // 设置文本展示方向
    // direction,
  } = React.useContext(ConfigContext);

  const {
    // 栅格间隔
    gutter,
    // 是否自动换行
    wrap,
    // 支持 Flex Gap
    supportFlexGap,
  } = React.useContext(RowContext);

  const {
    prefixCls: customizePrefixCls,
    // 子节点
    children,
    // 栅格占位格数
    span,
    // 栅格顺序
    order,
    // 栅格左侧的间隔格数，间隔内不可以有栅格
    offset,
    // 栅格向右移动格数
    push,
    // 栅格向左移动格数
    pull,
    // flex 布局属性
    flex,
    // 自定义class
    className,
    style,
    ...others
  } = props;

  // 前缀
  const prefixCls = getPrefixCls('col', customizePrefixCls);

  /* ----------------- 设置尺寸对应的样式 ----------------------- */

  let sizeClassObj = {};
  sizes.forEach((size) => {
    let sizeProps: ColSize = {};

    const propSize = props[size];
    // 栅格占位格数
    if (typeof propSize === 'number') {
      sizeProps.span = propSize;
    }
    // 对象
    else if (typeof propSize === 'object') {
      sizeProps = propSize || {};
    }

    delete others[size];

    sizeClassObj = {
      ...sizeClassObj,
      // 栅格占位格数
      [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
      // 栅格顺序
      [`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
      // 栅格左侧的间隔格数，间隔内不可以有栅格
      [`${prefixCls}-${size}-offset-${sizeProps.offset}`]:
        sizeProps.offset || sizeProps.offset === 0,
      // 栅格向右移动格数
      [`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
      // 栅格向左移动格数
      [`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
      // 方向
      // [`${prefixCls}-rtl`]: direction === "rtl",
    };
  });

  /* ----------------- useColStyle ----------------------- */
  // 设置col样式
  const [wrapSSR, hashId] = useColStyle(prefixCls);

  const classes = classNames(
    prefixCls,
    {
      // 栅格占位格数
      [`${prefixCls}-${span}`]: span !== undefined,
      [`${prefixCls}-order-${order}`]: order,
      // 栅格左侧的间隔格数，间隔内不可以有栅格
      [`${prefixCls}-offset-${offset}`]: offset,
      // 栅格向右移动格数
      [`${prefixCls}-push-${push}`]: push,
      // 栅格向左移动格数
      [`${prefixCls}-pull-${pull}`]: pull,
    },
    // 自定义class
    className,
    // 设置尺寸对应的样式
    sizeClassObj,
    // 设置col样式
    hashId,
  );

  /* ----------------- mergedStyle ----------------------- */

  // 合并样式
  const mergedStyle: React.CSSProperties = {};

  // 水平间距使用padding
  if (gutter && gutter[0] > 0) {
    // 设置padding
    const horizontalGutter = gutter[0] / 2;

    mergedStyle.paddingLeft = horizontalGutter;
    mergedStyle.paddingRight = horizontalGutter;
  }

  // 垂直间距使用padding & 不支持FlexGap
  if (gutter && gutter[1] > 0 && !supportFlexGap) {
    // 设置padding
    const verticalGutter = gutter[1] / 2;

    mergedStyle.paddingTop = verticalGutter;
    mergedStyle.paddingBottom = verticalGutter;
  }

  // 有设置 flex 布局属性
  if (flex) {
    mergedStyle.flex = parseFlex(flex);

    // Hack for Firefox to avoid size issue
    if (wrap === false && !mergedStyle.minWidth) {
      mergedStyle.minWidth = 0;
    }
  }

  /* ----------------- Render ----------------------- */

  return wrapSSR(
    <div {...others} style={{ ...mergedStyle, ...style }} className={classes} ref={ref}>
      {children}
    </div>,
  );
});

// dev
if (process.env.NODE_ENV !== 'production') {
  Col.displayName = 'Col';
}

export default Col;

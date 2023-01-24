import classNames from 'classnames';
import * as React from 'react';

// 全局化配置
import { ConfigContext } from '../config-provider';
// row配置
import RowContext from './rowContext';
// 响应尺寸数组
import useResponsiveObserver, { responsiveArray } from '../util/responsiveObserver';
// 是否支持FlexGap
import useFlexGapSupport from '../util/hooks/useFlexGapSupport';
// 设置row样式
import { useRowStyle } from './style';

// type

// row props | 间隔
import type { Gap, Gutter, RowProps } from './types/row';

// 响应尺寸 | 使用的尺寸
import type { Breakpoint, ScreenMap } from '../util/responsiveObserver';

// 水平排列方式
const useMergePropByScreen = (
  oriProp: RowProps['align'] | RowProps['justify'],
  screen: ScreenMap,
) => {
  // prop是否是字符串
  const [prop, setProp] = React.useState(typeof oriProp === 'string' ? oriProp : '');

  // 合并方法
  const mergeAlignOrJustify = () => {
    // string
    if (typeof oriProp === 'string') {
      setProp(oriProp);
    }

    // 不是object
    if (typeof oriProp !== 'object') {
      return;
    }

    for (let i = 0; i < responsiveArray.length; i++) {
      // 间距
      const breakpoint: Breakpoint = responsiveArray[i];

      // 不匹配
      if (!screen[breakpoint]) {
        continue;
      }

      // 当前值
      const currentValue = oriProp[breakpoint];

      if (currentValue !== undefined) {
        setProp(currentValue);

        return;
      }
    }
  };

  React.useEffect(() => {
    mergeAlignOrJustify();
  }, [JSON.stringify(oriProp), screen]);

  return prop;
};

const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    // 子节点
    children,
    // style
    style,
    // 是否自动换行
    wrap,
    // 栅格间隔
    gutter = 0,
    // 水平排列方式
    justify,
    // 垂直对齐方式
    align,
    ...others
  } = props;

  const {
    getPrefixCls,
    // 设置文本展示方向
    // direction,
  } = React.useContext(ConfigContext);

  // 使用的尺寸
  const [screens, setScreens] = React.useState<ScreenMap>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
  });

  // 调用 responsiveObserve 回调时的信息 保存 屏幕信息
  const [currentScreens, setCurrentScreens] = React.useState<ScreenMap>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false,
  });

  /* ----------------- 计算响应数据 ----------------------- */

  // 水平排列方式
  const mergeJustify = useMergePropByScreen(justify, currentScreens);

  // 垂直对齐方式
  const mergeAlign = useMergePropByScreen(align, currentScreens);

  // 使用 Flex Gap
  const supportFlexGap = useFlexGapSupport();

  // 栅格间隔
  const gutterRef = React.useRef<Gutter | [Gutter, Gutter]>(gutter);

  /* ----------------- useEffect ----------------------- */
  const responsiveObserver = useResponsiveObserver();

  React.useEffect(() => {
    // 订阅事件
    const token = responsiveObserver.subscribe((screen) => {
      setCurrentScreens(screen);
      const currentGutter = gutterRef.current || 0;

      if (
        // 对象
        (!Array.isArray(currentGutter) && typeof currentGutter === 'object') ||
        // 数组数据是对象
        (Array.isArray(currentGutter) &&
          (typeof currentGutter[0] === 'object' || typeof currentGutter[1] === 'object'))
      ) {
        setScreens(screen);
      }
    });

    // 删除订阅者
    return () => responsiveObserver.unsubscribe(token);
  }, []);

  /* ----------------- Render ----------------------- */
  const prefixCls = getPrefixCls('row', customizePrefixCls);

  // 设置row样式
  const [wrapSSR, hashId] = useRowStyle(prefixCls);

  // 合并class
  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-no-wrap`]: wrap === false,
      // 水平排列方式
      [`${prefixCls}-${mergeJustify}`]: mergeJustify,
      // 垂直对齐方式
      [`${prefixCls}-${mergeAlign}`]: mergeAlign,
      // 方向
      // [`${prefixCls}-rtl`]: direction === "rtl",
    },
    hashId,
  );

  // "gutters" 是每个渲染阶段的新数组，它会使 'React.useMemo' 无效
  // 所以我们在这里解构“gutters”变量
  const getGutter = (): [Gap, Gap] => {
    const results: [Gap, Gap] = [undefined, undefined];

    // 格式化栅格间隔
    const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, undefined];

    normalizedGutter.forEach((_gutter, index) => {
      // 支持响应式的对象
      if (typeof _gutter === 'object') {
        // 响应尺寸数组
        for (let i = 0; i < responsiveArray.length; i++) {
          // 当前使用的尺寸
          const breakpoint: Breakpoint = responsiveArray[i];

          // 设置对应尺寸的水平间隔
          if (screens[breakpoint] && _gutter[breakpoint] !== undefined) {
            results[index] = _gutter[breakpoint] as number;

            break;
          }
        }
      }
      // 像素值
      else {
        results[index] = _gutter;
      }
    });

    return results;
  };

  // 栅格间隔
  const gutters = getGutter();
  // [水平间距, 垂直间距]
  const [gutterH, gutterV] = gutters;

  // row配置
  // useMemo 调用您的函数并缓存其结果
  const rowContext = React.useMemo(
    () => ({
      // 栅格间隔
      gutter: [gutterH, gutterV] as [number, number],
      // 是否自动换行
      wrap,
      // 支持 Flex Gap
      supportFlexGap,
    }),
    [gutterH, gutterV, wrap, supportFlexGap],
  );

  // 添加gutter相关样式
  const rowStyle: React.CSSProperties = {};
  // 垂直栅格间隔
  const horizontalGutter = gutters[0] != null && gutters[0] > 0 ? gutters[0] / -2 : undefined;
  // 水平栅格间隔
  const verticalGutter = gutters[1] != null && gutters[1] > 0 ? gutters[1] / -2 : undefined;

  // 垂直栅格间隔
  if (horizontalGutter) {
    rowStyle.marginLeft = horizontalGutter;
    rowStyle.marginRight = horizontalGutter;
  }

  // FlexGap支持
  if (supportFlexGap) {
    // 如果 flex gap 支持，则直接设置 gap
    [, rowStyle.rowGap] = gutters;
  }
  // 水平栅格间隔
  else if (verticalGutter) {
    rowStyle.marginTop = verticalGutter;
    rowStyle.marginBottom = verticalGutter;
  }

  return wrapSSR(
    <RowContext.Provider value={rowContext}>
      <div {...others} className={classes} style={{ ...rowStyle, ...style }} ref={ref}>
        {children}
      </div>
    </RowContext.Provider>,
  );
});

// dev
if (process.env.NODE_ENV !== 'production') {
  Row.displayName = 'Row';
}

export default Row;

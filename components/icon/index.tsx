import * as React from 'react';
import classNames from 'classnames';

// 全局化配置
import { ConfigContext } from '../config-provider';
// utils
import { svgBaseProps } from './utils';

// type
import type { CustomIconComponentProps } from './types/icon';

// props
export interface IconProps extends React.HTMLProps<HTMLDivElement> {
  // 组件前缀
  prefixCls?: string;
  // className
  className?: string;
  // 子节点
  children?: React.ReactNode;
  // 控制如何渲染图标
  component?:
    | React.ComponentType<CustomIconComponentProps | React.SVGProps<SVGSVGElement>>
    | React.ForwardRefExoticComponent<CustomIconComponentProps>;
}

// 内部props方法
export interface InternalIconProps extends IconProps {
  // viewBox
  viewBox?: string;
}

const Icon = React.forwardRef<HTMLSpanElement, InternalIconProps>((props, ref) => {
  const {
    // 获取前缀
    getPrefixCls,
  } = React.useContext(ConfigContext);

  const {
    // affect outter <i>...</i>
    className,

    // affect inner <svg>...</svg>
    component: Component,

    prefixCls: customizePrefixCls,

    viewBox,
    onClick,

    // children
    children,
    ...restProps
    // rootClassName,
  } = props;

  const innerSvgProps: CustomIconComponentProps = {
    ...svgBaseProps,
    viewBox,
  };

  // ------------------render---------------- //

  // 前缀
  const prefixCls = getPrefixCls('icon', customizePrefixCls);

  const iconClass = classNames(prefixCls, className);

  // component > children
  const renderInnerNode = () => {
    if (Component) {
      return <Component {...innerSvgProps}>{children}</Component>;
    }
  };

  return (
    <i className={iconClass} onClick={onClick} {...restProps} ref={ref}>
      {renderInnerNode()}
    </i>
  );
});

Icon.displayName = 'Icon';

export default Icon;

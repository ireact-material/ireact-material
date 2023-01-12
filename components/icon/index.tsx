import * as React from "react";
import classNames from "classnames";

// 全局化配置
import { ConfigContext } from "../config-provider";
// utils
import { svgBaseProps } from "./utils";

// type
import type { InternalIconProps, CustomIconComponentProps } from "./types/icon";

const Icon = React.forwardRef<HTMLSpanElement, InternalIconProps>(
	(props, ref) => {
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
		const prefixCls = getPrefixCls("icon", customizePrefixCls);

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
	},
);

Icon.displayName = "Icon";

export default Icon;

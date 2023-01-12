import type * as React from "react";

// props
export interface IconProps extends React.HTMLProps<HTMLDivElement> {
	// 组件前缀
	prefixCls?: string;
	// className
	className?: string;
	// 子节点
	children: React.ReactNode;
	// 控制如何渲染图标
	component?:
		| React.ComponentType<
				CustomIconComponentProps | React.SVGProps<SVGSVGElement>
		  >
		| React.ForwardRefExoticComponent<CustomIconComponentProps>;
}

// 内部props方法
export interface InternalIconProps extends IconProps {
	// viewBox
	viewBox?: string;
}

export interface CustomIconComponentProps {
	width: string | number;
	height: string | number;
	fill: string;
	viewBox?: string;
	className?: string;
	style?: React.CSSProperties;
}

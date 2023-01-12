import React from "react";
import JsonML from "jsonml.js/lib/utils";
import toReactComponent from "jsonml-to-react-element";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";

import { useLocation, useIntl, type IPreviewerProps } from "dumi";

/**
 * HOC for convert dumi previewer props to bisheng previewer props
 */
export default function fromDumiProps<P extends object>(
	WrappedComponent: React.ComponentType<P>,
): React.FC<IPreviewerProps> {
	const hoc = function DumiPropsPreviewer(props: IPreviewerProps) {
		const location = useLocation();
		const intl = useIntl();

		const {
			asset,
			children,
			demoUrl,
			expand,
			description = "",
			...meta
		} = props;

		// 获取当前组件的代码
		const entryCode = asset.dependencies["index.tsx"].value;

		const transformedProps = {
			meta: {
				id: asset.id,
				title: "",
				filename: meta.filePath,
				...meta,
			},
			content: description,
			preview: () => children,
			utils: {
				// 将 JsonML 转换为 React Component
				toReactComponent(jsonML: any) {
					return toReactComponent(jsonML, [
						[
							(node: any) =>
								JsonML.isElement(node) && JsonML.getTagName(node) === "pre",
							(node: any, index: any) => {
								// @ts-ignore
								// ref: https://github.com/benjycui/bisheng/blob/master/packages/bisheng/src/bisheng-plugin-highlight/lib/browser.js#L7
								const attr = JsonML.getAttributes(node);
								return React.createElement(
									"pre",
									{
										key: index,
										className: `language-${attr.lang}`,
									},
									React.createElement("code", {
										dangerouslySetInnerHTML: { __html: attr.highlighted },
									}),
								);
							},
						],
					]);
				},
			},
			// 语言
			intl: { locale: intl.locale },
			// 获取当前组件的代码
			sourceCodes: {
				jsx: meta.jsx,
				tsx: entryCode,
			},
			// 语法高亮
			highlightedCodes: {
				// jsx: Prism.highlight(meta.jsx, Prism.languages.javascript, 'jsx'),
				tsx: Prism.highlight(entryCode, Prism.languages.typescript, "tsx"),
			},
			style: meta.style,
			location,
			src: demoUrl,
			expand,
			highlightedStyle: "",
		} as P;

		return <WrappedComponent {...transformedProps} />;
	};

	return hoc;
}

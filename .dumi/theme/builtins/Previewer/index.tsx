import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import LZString from "lz-string";

import fromDumiProps from "./fromDumiProps";
import SiteContext from "../../slots/SiteContext";
import { version } from "../../../../package.json";
import * as code from "./code";

// common
import CodeSandboxIcon from "../../common/CodeSandboxIcon";
import CodePenIcon from "../../common/CodePenIcon";
import CodePreview from "../../common/CodePreview";

// type
import type { SiteContextProps } from "../../slots/SiteContext";

// props
interface DemoProps {
	meta: any;
	src: string;
	content: string;
	preview: (react: typeof React, reactDOM: typeof ReactDOM) => React.ReactNode;
	highlightedCodes: Record<PropertyKey, string>;
	style: string;
	highlightedStyle: string;
	expand: boolean;
	intl: any;
	sourceCodes: Record<"jsx" | "tsx", string>;
	location: Location;
	showRiddleButton: boolean;
	utils?: any;
}

// state
interface DemoState {
	codeType?: string;
	copied?: boolean;
	codeExpand?: boolean;
	copyTooltipOpen?: boolean | string;
}

// 压缩
function compress(string: string): string {
	// JavaScript 压缩算法
	return LZString.compressToBase64(string)
		.replace(/\+/g, "-") // Convert '+' to '-'
		.replace(/\//g, "_") // Convert '/' to '_'
		.replace(/=+$/, ""); // Remove ending '='
}

class Demo extends React.Component<DemoProps, DemoState> {
	static contextType = SiteContext;

	// 预览demo
	liveDemo: any;

	// 锚点
	anchorRef = React.createRef<HTMLAnchorElement>();

	// codesandbox
	codeSandboxIconRef = React.createRef<HTMLFormElement>();

	// codepen
	codepenIconRef = React.createRef<HTMLFormElement>();

	// state
	state: DemoState = {
		codeExpand: false,
		codeType: "tsx",
	};

	// componentDidMount
	componentDidMount() {
		const { meta, location } = this.props;

		// 滚动到对应的demo
		if (meta.id === location.hash.slice(1)) {
			this.anchorRef.current?.click();
		}
	}

	// 获取源代码
	getSourceCode = (): [string, string] => {
		const { sourceCodes } = this.props;

		// jsx | tsx 文件
		return [sourceCodes.jsx, sourceCodes.tsx];
	};

	// 展开
	handleCodeExpand = () => {
		const { codeExpand } = this.state;

		this.setState({ codeExpand: !codeExpand });
	};

	render() {
		const {
			meta,
			expand,
			style,
			preview,
			content,
			intl: { locale },
			highlightedCodes,
		} = this.props;
		const { codeType } = this.state;

		const site: SiteContextProps = this.context;

		// -------------------state---------------------------- //

		// 代码是否展开
		const codeExpand = this.state.codeExpand || expand;
		// 描述
		const localizeIntro = content[locale] || content;
		// 获取demo标题
		const localizedTitle = meta?.title[locale] || meta?.title;

		// 获取源代码
		const [sourceCode, sourceCodeTyped] = this.getSourceCode();
		const suffix = codeType === "tsx" ? "tsx" : "js";

		// -------------------codesandbox配置---------------------------- //

		// 依赖
		const dependencies: Record<PropertyKey, string> = sourceCode
			.split("\n")
			.reduce(
				(acc, line) => {
					const matches = line.match(/import .+? from '(.+)';$/);

					// if (matches && matches[1] && !line.includes('antd')) {
					//   const paths = matches[1].split('/');

					//   if (paths.length) {
					//     const dep = paths[0].startsWith('@') ? `${paths[0]}/${paths[1]}` : paths[0];
					//     acc[dep] = 'latest';
					//   }
					// }

					return acc;
				},
				{ "ireact-material": version },
			);

		// dependencies['@ant-design/icons'] = 'latest';

		// tsx文件引入类型
		if (suffix === "tsx") {
			dependencies["@types/react"] = "^18.0.0";
			dependencies["@types/react-dom"] = "^18.0.0";
		}

		// 索引CSS内容
		const indexCssContent = (style || "")
			.trim()
			.replace(new RegExp(`#${meta.id}\\s*`, "g"), "")
			.replace("</style>", "")
			.replace("<style>", "");

		// 关联的包
		const codesandboxPackage = {
			title: `${localizedTitle}`,
			main: "index.js",
			dependencies: {
				...dependencies,
				react: "^18.0.0",
				"react-dom": "^18.0.0",
				"react-scripts": "^4.0.0",
			},
			devDependencies: {
				typescript: "^4.0.5",
			},
			scripts: {
				start: "react-scripts start",
				build: "react-scripts build",
				test: "react-scripts test --env=jsdom",
				eject: "react-scripts eject",
			},
			browserslist: [">0.2%", "not dead"],
		};

		const importReactContent = code.importReactContent(
			suffix,
			sourceCodeTyped,
			sourceCode,
		);

		// codesandbox配置
		const codesanboxPrefillConfig = {
			files: {
				"package.json": { content: codesandboxPackage },
				"index.css": { content: indexCssContent },
				[`index.${suffix}`]: { content: code.indexJsContent },
				[`demo.${suffix}`]: {
					content: code.demoJsContent(
						importReactContent[0],
						importReactContent[1],
					),
				},
				"index.html": {
					content: code.html,
				},
			},
		};

		// -------------------render---------------------------- //

		// 描述
		const introChildren = (
			<div dangerouslySetInnerHTML={{ __html: localizeIntro }} />
		);

		// 显示demo
		if (!this.liveDemo) {
			this.liveDemo = preview(React, ReactDOM);
		}

		// 样式
		const codeBoxClass = classNames("code-box", {
			expand: codeExpand,
		});

		// 高亮样式
		const highlightClass = classNames("highlight-wrapper", {
			"highlight-wrapper-expand": codeExpand,
		});

		const codeBox = (
			<section className={codeBoxClass} id={meta.id}>
				<section className="code-box-demo" data-compact={meta.compact}>
					{/* demo */}
					<React.StrictMode>{this.liveDemo}</React.StrictMode>
					{/* style */}
					{style ? <style dangerouslySetInnerHTML={{ __html: style }} /> : null}
				</section>
				{/* markdown */}
				<section className="code-box-meta markdown">
					{/* 标题 */}
					<div className="code-box-title">
						<a href={`#${meta.id}`} ref={this.anchorRef}>
							{localizedTitle}
						</a>
					</div>
					{/* 描述 */}
					<div className="code-box-description">{introChildren}</div>
					{/* 选择按钮 */}
					<div className="code-box-actions">
						{/* codesandbox */}
						<form
							className="code-box-code-action"
							action="https://codesandbox.io/api/v1/sandboxes/define"
							method="POST"
							target="_blank"
							ref={this.codeSandboxIconRef}
							onClick={() => {
								this.codeSandboxIconRef.current.submit();
							}}
						>
							<input
								type="hidden"
								name="parameters"
								value={compress(JSON.stringify(codesanboxPrefillConfig))}
							/>
							<CodeSandboxIcon className="code-box-codesandbox" />
						</form>
						{/* codepen */}
						<form
							className="code-box-code-action"
							action="https://codepen.io/pen/define"
							method="POST"
							target="_blank"
							ref={this.codepenIconRef}
							onClick={() => {
								this.codepenIconRef.current?.submit();
							}}
						>
							<input
								type="hidden"
								name="data"
								value={JSON.stringify(
									code.codepenPrefillConfig(localizedTitle, sourceCode),
								)}
							/>
							<CodePenIcon className="code-box-codepen" />
						</form>
						{/* 展开 */}
						<div className="code-expand-icon code-box-code-action">
							<img
								alt="expand code"
								src={
									site.theme.includes("dark")
										? "https://gw.alipayobjects.com/zos/antfincdn/btT3qDZn1U/wSAkBuJFbdxsosKKpqyq.svg"
										: "https://gw.alipayobjects.com/zos/antfincdn/Z5c7kzvi30/expand.svg"
								}
								className={
									codeExpand ? "code-expand-icon-hide" : "code-expand-icon-show"
								}
								onClick={() => this.handleCodeExpand()}
							/>
							<img
								alt="expand code"
								src={
									site.theme.includes("dark")
										? "https://gw.alipayobjects.com/zos/antfincdn/CjZPwcKUG3/OpROPHYqWmrMDBFMZtKF.svg"
										: "https://gw.alipayobjects.com/zos/antfincdn/4zAaozCvUH/unexpand.svg"
								}
								className={
									codeExpand ? "code-expand-icon-show" : "code-expand-icon-hide"
								}
								onClick={() => this.handleCodeExpand()}
							/>
						</div>
					</div>
				</section>
				{/* 代码 */}
				<section className={highlightClass} key="code">
					<CodePreview
						codes={highlightedCodes}
						toReactComponent={this.props.utils?.toReactComponent}
						onCodeTypeChange={(type) => this.setState({ codeType: type })}
					/>
				</section>
			</section>
		);

		return codeBox;
	}
}

export default fromDumiProps(Demo);

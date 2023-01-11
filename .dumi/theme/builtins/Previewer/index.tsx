import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import fromDumiProps from "./fromDumiProps";
import SiteContext from "../../slots/SiteContext";

// type

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

// eslint-disable-next-line react/prefer-stateless-function
class Demo extends React.Component<DemoProps, DemoState> {
	static contextType = SiteContext;

	// 预览demo
	liveDemo: any;

	// 锚点
	anchorRef = React.createRef<HTMLAnchorElement>();

	// state
	state: DemoState = {
		codeExpand: false,
		// copied: false,
		// copyTooltipOpen: false,
		// codeType: 'tsx',
	};

	// componentDidMount
	componentDidMount() {
		const { meta, location } = this.props;

		// 滚动到对应的demo
		if (meta.id === location.hash.slice(1)) {
			this.anchorRef.current?.click();
		}
	}

	render() {
		const {
			meta,
			expand,
			style,
			preview,
			content,
			intl: { locale },
		} = this.props;

		// 代码是否展开
		const codeExpand = this.state.codeExpand || expand;

		// 获取demo标题
		const localizedTitle = meta?.title[locale] || meta?.title;

		// 描述
		const localizeIntro = content[locale] || content;
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
				</section>
			</section>
		);

		return codeBox;
	}
}

export default fromDumiProps(Demo);

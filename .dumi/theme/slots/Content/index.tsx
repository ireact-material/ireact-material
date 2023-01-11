import React, { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useRouteMeta } from "dumi";
import { Col } from "ireact-material";
import { css } from "@emotion/react";

const useStyle = () => ({
	articleWrapper: css`
    padding: 0 64px 32px 64px;
  `,
});

const Content: React.FC<{ children: ReactNode }> = ({ children }) => {
	// 获取当前路由的元数据
	const meta = useRouteMeta();

	// 样式
	const styles = useStyle();

	// 显示debug
	const [showDebug, setShowDebug] = useState(false);

	// 页面标题数据
	const debugDemos = useMemo(
		() =>
			meta.toc?.filter((item) => item._debug_demo).map((item) => item.id) || [],
		[meta],
	);

	return (
		<Col xxl={20} xl={19} lg={18} md={18} sm={24} xs={24}>
			<article css={styles.articleWrapper}>
				{/* 标题 */}
				<h1>
					{meta.frontmatter?.title}
					{/* 副标题 */}
					{meta.frontmatter.subtitle && (
						<span style={{ marginLeft: 12 }}>{meta.frontmatter.subtitle}</span>
					)}
				</h1>

				{/* 内容 */}
				{children}
			</article>
		</Col>
	);
};

export default Content;

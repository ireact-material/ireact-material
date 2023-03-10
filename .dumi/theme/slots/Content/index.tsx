import { css } from '@emotion/react';
import { useRouteMeta } from 'dumi';
import { Col } from 'ireact-material';
import React from 'react';

import type { ReactNode } from 'react';

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

  return (
    <Col xxl={20} xl={19} lg={18} md={18} sm={24} xs={24}>
    {/* <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}> */}
      <article css={styles.articleWrapper}>
        {/* 标题 */}
        <h1 style={{ fontSize: 30 }}>
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

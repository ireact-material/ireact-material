import { useRouteMeta, Helmet } from 'dumi';
import React, { useMemo } from 'react';

const CommonHelmet = () => {
  const meta = useRouteMeta();

  // useMemo 调用您的函数并缓存其结果
  const [title, description] = useMemo(() => {
    // 设置页面标题
    const helmetTitle = `${meta.frontmatter.subtitle || ''} ${
      meta.frontmatter?.title
    } - IReact Material`;
    const helmetDescription = meta.frontmatter.description;

    return [helmetTitle, helmetDescription];
  }, [meta]);

  return (
    <Helmet>
      <title>{title}</title>
      {/* 标题 */}
      <meta property="og:title" content={title} />
      {/* 描述 */}
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
};

export default CommonHelmet;

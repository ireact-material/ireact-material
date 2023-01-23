import { theme } from 'ireact-material';

const { useToken } = theme;

const useSiteToken = () => {
  const result = useToken();
  const { token } = result;

  return {
    result,
    // 公共变量
    token: {
      ...token,

      mobileMaxWidth: 767.99,
      headerHeight: 64,
      siteMarkdownCodeBg: token.colorFillTertiary,
      codeFamily: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
    },
  };
};

export default useSiteToken;

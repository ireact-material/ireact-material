import { defaultConfig, useToken as useInternalToken } from './internal';

// 导出梯度变量
import defaultAlgorithm from './themes/default';
// import darkAlgorithm from './themes/dark';
// import compactAlgorithm from './themes/compact';

// 获取当前上下文设计令牌。 如果您使用嵌套主题配置，将会有所不同
function useToken() {
  // 获取全局token
  const [theme, token, hashId] = useInternalToken();

  return {
    theme,
    token,
    hashId,
  };
}

export default {
  // 基础变量
  defaultSeed: defaultConfig.token,

  useToken,

  // 导出梯度变量
  defaultAlgorithm,
  // darkAlgorithm,
  // compactAlgorithm,
};

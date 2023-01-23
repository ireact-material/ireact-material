import useMemo from 'rc-util/lib/hooks/useMemo';
import isEqual from 'rc-util/lib/isEqual';

// type

// 主题配置
import type { ThemeConfig } from '../types/context';
// 需要覆盖的变量
import type { OverrideToken } from '../../theme/types/index';

// 基础变量
import { defaultConfig } from '../../theme/internal';

export default function useTheme(
  theme?: ThemeConfig,
  parentTheme?: ThemeConfig,
): ThemeConfig | undefined {
  // 主题配置
  const themeConfig = theme || {};

  // 父主题配置
  const parentThemeConfig: ThemeConfig =
    // 没有继承上层 ConfigProvider 中配置的主题 使用 基础变量 否则使用 parentTheme
    themeConfig.inherit === false || !parentTheme ? defaultConfig : parentTheme;

  // 合并主题
  // 只有更新的方法返回true才会触发要缓存的函数
  const mergedTheme = useMemo<ThemeConfig | undefined>(
    () => {
      // 没有自定义主题
      if (!theme) {
        return parentTheme;
      }

      // 需要覆盖的组件
      const mergedComponents = {
        ...parentThemeConfig.components,
      };

      Object.keys(theme.components || {}).forEach((componentName: keyof OverrideToken) => {
        // 覆盖对应的组件的主题
        mergedComponents[componentName] = {
          ...mergedComponents[componentName],
          ...theme.components![componentName],
        } as any;
      });

      // Base token
      return {
        // 父主题配置
        ...parentThemeConfig,
        // 覆盖的主题配置
        ...themeConfig,

        // 变量
        token: {
          ...parentThemeConfig.token,
          ...themeConfig.token,
        },
        // 组件
        components: mergedComponents,
      };
    },
    [themeConfig, parentThemeConfig],
    // 对比符合时触发更新
    (prev, next) =>
      prev.some((prevTheme, index) => {
        const nextTheme = next[index];

        // 深度比较两个对象字面量
        return !isEqual(prevTheme, nextTheme, true);
      }),
  );

  return mergedTheme;
}

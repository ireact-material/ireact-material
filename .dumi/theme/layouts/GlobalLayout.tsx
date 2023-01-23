import React, { startTransition, useCallback, useEffect, useMemo } from 'react';

import { useOutlet, useSearchParams, createSearchParams } from 'dumi';
import { createCache, StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme as Theme } from 'ireact-material';

import SiteContext from '../slots/SiteContext';

// type
import type { SiteContextProps } from '../slots/SiteContext';
import type { ThemeName } from '../common/ThemeSwitch';

type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];
type SiteState = Partial<Omit<SiteContextProps, 'updateSiteContext'>>;

// 样式缓存
const styleCache = createCache();
if (typeof global !== 'undefined') {
  (global as any).styleCache = styleCache;
}

// 获取主题算法
const getAlgorithm = (themes: ThemeName[] = []) =>
  themes.map((theme) => {
    if (theme === 'dark') {
      console.log('dark');
      // return Theme.darkAlgorithm;
    }

    // if (theme === 'compact') {
    //   return antdTheme.compactAlgorithm;
    // }
    return Theme.defaultAlgorithm;
  });

const GlobalLayout: React.FC = () => {
  // 用于渲染父路由中渲染子路由
  const outlet = useOutlet();

  // 读取和修改当前 URL 的 query string
  const [searchParams, setSearchParams] = useSearchParams();

  const [{ theme, isMobile }, setSiteState] = React.useState<SiteState>({
    isMobile: false,
    theme: ['light'],
  });

  // 更新
  const updateSiteConfig = useCallback(
    (props: SiteState) => {
      setSiteState((prev) => ({ ...prev, ...props }));

      // updating `searchParams` will clear the hash
      const oldSearchStr = searchParams.toString();

      let nextSearchParams: URLSearchParams = searchParams;
      (Object.entries(props) as Entries<SiteContextProps>).forEach(([key, value]) => {
        // 创建链接后缀
        if (key === 'theme') {
          nextSearchParams = createSearchParams({
            ...nextSearchParams,
            theme: value.filter((t) => t !== 'light'),
          });
        }
      });

      // 修改当前 URL 的 query string
      if (nextSearchParams.toString() !== oldSearchStr) {
        setSearchParams(nextSearchParams);
      }
    },
    [searchParams, setSearchParams],
  );

  // context
  const siteContextValue = useMemo(
    () => ({
      updateSiteConfig,
      theme: theme!,
      isMobile: isMobile!,
    }),
    [isMobile, updateSiteConfig, theme],
  );

  useEffect(() => {
    const _theme = searchParams.getAll('theme') as ThemeName[];

    // 让您在不阻塞 UI 的情况下更新状态
    startTransition(() => {
      setSiteState({
        theme: _theme,
        isMobile: false,
      });
    });
  }, []);

  return (
    <StyleProvider cache={styleCache}>
      <SiteContext.Provider value={siteContextValue}>
        <ConfigProvider
          theme={{
            algorithm: getAlgorithm(theme),
          }}
        >
          {outlet}
        </ConfigProvider>
      </SiteContext.Provider>
    </StyleProvider>
  );
};

export default GlobalLayout;

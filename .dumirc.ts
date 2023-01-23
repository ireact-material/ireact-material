import { defineConfig } from 'dumi';
import path from 'path';
import { version } from './package.json';
import rehypeAntd from './.dumi/rehypeAntd';

export default defineConfig({
  // 约定式路由相关配置
  conventionRoutes: {
    // to avoid generate routes for .dumi/pages/index/components/xx
    exclude: [new RegExp('index/components/')],
  },
  // ssr: process.env.NODE_ENV === 'production' ? {} : false,
  // 开启 hash 模式，让 build 之后的产物包含 hash 后缀。通常用于增量发布和避免浏览器加载缓存
  hash: true,
  // 配置输出路径
  outputPath: '_site',
  // 用于配置 Markdown 解析相关的行为
  resolve: {
    docDirs: [{ type: 'doc', dir: 'docs' }],
    atomDirs: [{ type: 'component', dir: 'components' }],
    codeBlockMode: 'passive',
  },
  locales: [
    { id: 'en-US', name: 'English', suffix: '' },
    { id: 'zh-CN', name: '中文', suffix: '-cn' },
  ],
  // 设置代码中的可用变量
  define: {
    ireactMaterialReproduceVersion: version,
  },
  // 配置别名，对 import 语句的 source 做映射
  alias: {
    'ireact-material/lib': path.join(__dirname, 'components'),
    'ireact-material/es': path.join(__dirname, 'components'),
    // Change ireact-material from `index.js` to `.dumi/theme/ireact-material.js` to remove deps of root style
    'ireact-material': require.resolve('./.dumi/theme/ireact-material.js'),
    ireactmaterial: require.resolve('./.dumi/theme/ireact-material.js'),
  },
  // 文档编译时修改 hast 树的插件
  extraRehypePlugins: [rehypeAntd],
  // 配置额外的 babel 插件集。可传入插件集地址或插件集函数
  extraBabelPresets: ['@emotion/babel-preset-css-prop'],
  // 配置基于 Module Federation 的提速功能
  mfsu: false,
  metas: [{ name: 'theme-color', content: '#5B8EFF' }],
  // headScripts
  headScripts: [
    `
    (function () {
      function isLocalStorageNameSupported() {
        const testKey = 'test';
        const storage = window.localStorage;
        try {
          storage.setItem(testKey, '1');
          storage.removeItem(testKey);
          return true;
        } catch (error) {
          return false;
        }
      }
      // 优先级提高到所有静态资源的前面，语言不对，加载其他静态资源没意义
      const pathname = location.pathname;

      function isZhCN(pathname) {
        return /-cn\\/?$/.test(pathname);
      }
      function getLocalizedPathname(path, zhCN) {
        const pathname = path.indexOf('/') === 0 ? path : '/' + path;
        if (!zhCN) {
          // to enUS
          return /\\/?index(-cn)?/.test(pathname) ? '/' : pathname.replace('-cn', '');
        } else if (pathname === '/') {
          return '/index-cn';
        } else if (pathname.indexOf('/') === pathname.length - 1) {
          return pathname.replace(/\\/$/, '-cn/');
        }
        return pathname + '-cn';
      }

      // 兼容旧的 URL， \`?locale=...\`
      const queryString = location.search;
      if (queryString) {
        const isZhCNConfig = queryString.indexOf('zh-CN') > -1;
        if (isZhCNConfig && !isZhCN(pathname)) {
          location.pathname = getLocalizedPathname(pathname, isZhCNConfig);
        }
      }

      // 首页无视链接里面的语言设置 https://github.com/ant-design/ant-design/issues/4552
      if (isLocalStorageNameSupported() && (pathname === '/' || pathname === '/index-cn')) {
        const lang =
          (window.localStorage && localStorage.getItem('locale')) ||
          ((navigator.language || navigator.browserLanguage).toLowerCase() === 'zh-cn'
            ? 'zh-CN'
            : 'en-US');
        // safari is 'zh-cn', while other browser is 'zh-CN';
        if ((lang === 'zh-CN') !== isZhCN(pathname)) {
          location.pathname = getLocalizedPathname(pathname, lang === 'zh-CN');
        }
      }
      document.documentElement.className += isZhCN(pathname) ? 'zh-cn' : 'en-us';
    })();
    `,
  ],
});

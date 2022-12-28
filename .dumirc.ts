import { defineConfig } from "dumi";
import path from "path";
// import { version } from './package.json';
import rehypeAntd from "./.dumi/rehypeAntd";

export default defineConfig({
	// 约定式路由相关配置
	conventionRoutes: {
		// to avoid generate routes for .dumi/pages/index/components/xx
		exclude: [new RegExp("index/components/")],
	},
	// 开启 hash 模式，让 build 之后的产物包含 hash 后缀。通常用于增量发布和避免浏览器加载缓存
	hash: true,
	// 配置输出路径
	outputPath: "docs-dist",
	// 用于配置 Markdown 解析相关的行为
	resolve: {
		docDirs: [{ type: "doc", dir: "docs" }],
		atomDirs: [{ type: "component", dir: "components" }],
		codeBlockMode: "passive",
	},
	// 设置代码中的可用变量
	define: {
		// version: version,
	},
	// 配置别名，对 import 语句的 source 做映射
	alias: {
		"ireact-material/lib": path.join(__dirname, "components"),
		"ireact-material/es": path.join(__dirname, "components"),
		// Change ireact-material from `index.js` to `.dumi/theme/ireact-material.js` to remove deps of root style
		"ireact-material": require.resolve("./.dumi/theme/ireact-material.js"),
	},
	// 配置额外的 babel 插件集。可传入插件集地址或插件集函数
	extraBabelPresets: ["@emotion/babel-preset-css-prop"],
	// 配置基于 Module Federation 的提速功能
	mfsu: false,
	extraRehypePlugins: [rehypeAntd],
});

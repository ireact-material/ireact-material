import React, { useMemo, useEffect, useRef, useLayoutEffect } from "react";
import { Helmet, useOutlet, useSiteData } from "dumi";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
import classNames from "classnames";

// 全局化配置
import ConfigProvider from "ireact-material/es/config-provider";
import zhCN from "ireact-material/es/locale/zh_CN";

// hook
import useLocale from "../../../hooks/useLocale";
import useLocation from "../../../hooks/useLocation";

// slots
import Header from "../../slots/Header";
import Footer from "../../slots/Footer";
import SidebarLayout from "../SidebarLayout";

// styles
import GlobalStyles from "../../common/GlobalStyles";

// 语言
const locales = {
	cn: {
		title: "",
		description: "",
	},
	en: {
		title: "",
		description: "",
	},
};

// 全局化配置props

const DocLayout: React.FC = () => {
	// 当前页面的加载状态，由于默认启用路由按需加载，所以切换路由时会有 loading 的过程
	const { loading } = useSiteData();

	// 倒计时
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	// 使用的语言
	const [locale, lang] = useLocale(locales);

	// 返回此级别路由的子路由的元素
	const outlet = useOutlet();

	// 路径
	const location = useLocation();
	const { pathname, search, hash } = location;

	// 渲染的内容
	// useMemo 调用您的函数并缓存其结果
	const content = useMemo(() => {
		if (
			["", "/"].some((path) => path === pathname) ||
			["/index"].some((path) => pathname.startsWith(path))
		) {
			return (
				<>
					{outlet}
					<Footer />
				</>
			);
		}
		// if (pathname.startsWith('/docs/resource')) {
		// 	return <ResourceLayout>{outlet}</ResourceLayout>;
		// }
		// if (pathname.startsWith('/theme-editor')) {
		// 	return outlet;
		// }

		return <SidebarLayout>{outlet}</SidebarLayout>;
	}, [pathname, outlet]);

	// 在所有的 DOM 变更之后同步调用 effect
	// 读取 DOM 布局并同步触发重渲染
	useLayoutEffect(() => {
		if (lang === "cn") {
			dayjs.locale("zh-cn");
		} else {
			dayjs.locale("en");
		}
	}, []);

	// 处理 hash 变化或从 Link 组件访问页面 hash，并在 async chunk 加载后跳转
	useEffect(() => {
		const id = hash.replace("#", "");

		if (id) document.getElementById(decodeURIComponent(id))?.scrollIntoView();
	}, [loading, hash]);

	// 顶部进度条
	useEffect(() => {
		const nprogressHiddenStyle = document.getElementById("nprogress-style");
		if (nprogressHiddenStyle) {
			timerRef.current = setTimeout(() => {
				nprogressHiddenStyle.parentNode?.removeChild(nprogressHiddenStyle);
			}, 0);
		}
	}, []);

	// 监听路由变化
	React.useEffect(() => {
		if (typeof (window as any).ga !== "undefined") {
			(window as any).ga("send", "pageview", pathname + search);
		}
		if (typeof (window as any)._hmt !== "undefined") {
			(window as any)._hmt.push(["_trackPageview", pathname + search]);
		}
	}, [location]);

	return (
		<>
			{/* 页面中动态配置 head 中的标签 */}
			<Helmet encodeSpecialCharacters={false}>
				<html lang={lang} data-direction="ltr" />
				<title>IReact Material</title>
				<link
					rel="icon"
					href="https://cdn.lovevuerk.com/plus/img/logo.92144542.png"
				/>
				<meta name="description" content={locale.description} />
				<meta property="og:title" content={locale?.title} />
				<meta property="og:type" content="website" />
				<meta
					property="og:image"
					content="https://cdn.lovevuerk.com/plus/img/logo.92144542.png"
				/>
			</Helmet>
			<ConfigProvider locale={lang === "cn" ? zhCN : undefined}>
				{/* 公共样式 */}
				<GlobalStyles />
				{/* header */}
				<Header />
				{/* 内容 */}
				{content}
			</ConfigProvider>
		</>
	);
};

export default DocLayout;

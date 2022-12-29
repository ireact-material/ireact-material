import React, { useMemo, useEffect } from "react";
import { Helmet, useOutlet, useSiteData } from "dumi";
import classNames from "classnames";

import Header from "../../slots/Header";
import Footer from "../../slots/Footer";

import SidebarLayout from "../SidebarLayout";

// common
import GlobalStyles from "../../common/GlobalStyles";

// hooks
import useLocation from "../../../hooks/useLocation";

const DocLayout: React.FC = () => {
	// 返回当前匹配的子路由元素
	const outlet = useOutlet();

	// 获取站点配置数据
	const { loading } = useSiteData();

	const location = useLocation();
	const { pathname, search, hash } = location;

	React.useEffect(() => {
		if (typeof (window as any).ga !== "undefined") {
			(window as any).ga("send", "pageview", pathname + search);
		}
		if (typeof (window as any)._hmt !== "undefined") {
			(window as any)._hmt.push(["_trackPageview", pathname + search]);
		}
	}, [location]);

	// handle hash change or visit page hash from Link component, and jump after async chunk loaded
	useEffect(() => {
		const id = hash.replace("#", "");

		if (id) document.getElementById(decodeURIComponent(id))?.scrollIntoView();
	}, [loading, hash]);

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

		return <SidebarLayout>{outlet}</SidebarLayout>;
	}, [pathname, outlet]);

	return (
		<>
			<Helmet encodeSpecialCharacters={false}>
				<html
					lang="zh"
					data-direction="ltr"
					className={classNames({ [`rtl`]: true })}
				/>
				<title>IReact Material</title>
				<link
					rel="icon"
					href="https://cdn.lovevuerk.com/plus/img/logo.92144542.png"
				/>
				{/* <meta name="description" content={locale.description} /> */}
				{/* <meta property="og:title" content={locale?.title} /> */}
				<meta property="og:type" content="website" />
				<meta
					property="og:image"
					content="https://cdn.lovevuerk.com/plus/img/logo.92144542.png"
				/>
			</Helmet>
			<>
				<GlobalStyles />
				<Header />
				{content}
			</>
		</>
	);
};

export default DocLayout;

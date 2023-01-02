import type { FC, PropsWithChildren } from "react";
import React from "react";
import Content from "../../slots/Content";
// import Sidebar from "../../slots/Sidebar";
import CommonHelmet from "../../common/CommonHelmet";

const SidebarLayout: FC<PropsWithChildren<{}>> = ({ children }) => (
	<main style={{ display: "flex", marginTop: 40 }}>
		{/* 页面中动态配置 head 中的标签 */}
		<CommonHelmet />
		{/* <Sidebar /> */}
		<Content>{children}</Content>
	</main>
);

export default SidebarLayout;

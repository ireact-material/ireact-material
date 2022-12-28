import type { FC, PropsWithChildren } from "react";
import React from "react";
import Content from "../../slots/Content";
import Sidebar from "../../slots/Sidebar";

import "./index.scss";

const SidebarLayout: FC<PropsWithChildren<{}>> = ({ children }) => (
	<main className='docs'>
		{/* <CommonHelmet />
    <Sidebar /> */}
		<Sidebar />
		<Content>{children}</Content>
	</main>
);

export default SidebarLayout;

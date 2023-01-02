import type React from "react";
import { useOutlet } from "dumi";

const GlobalLayout: React.FC = () => {
	// 用于渲染父路由中渲染子路由
	const outlet = useOutlet();

	return outlet;
};

export default GlobalLayout;

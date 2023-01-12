import React from "react";
import type { CSSProperties } from "react";

import { Affix } from "ireact-material";

const style: CSSProperties = {
	width: "150px",
	height: "30px",
	textAlign: "center",
	lineHeight: "30px",
	fontSize: "12px",
	borderRadius: "5px",
	background: "#5b8eff",
	color: "#fff",
};

const App: React.FC = () => (
	<Affix offsetTop={150}>
		<div style={style}>固定距离顶部150</div>
	</Affix>
);

export default App;

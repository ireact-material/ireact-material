import React, { useState } from "react";
import { Affix } from "ireact-material";

const App: React.FC = () => {
	const [top] = useState(100);
	// const [bottom, setBottom] = useState(10);

	return (
		<Affix offsetTop={top}>
			<div
				style={{
					height: "100px",
					width: "100px",
					background: "yellow",
					fontSize: "14px",
				}}
			>
				<a>12211</a>
				Affix top {top}
			</div>
		</Affix>
	);
};

export default App;

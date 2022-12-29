import React, { useState } from "react";
import { Affix } from "ireact-material";

const App: React.FC = () => {
	const [top, setTop] = useState(100);
	const [bottom, setBottom] = useState(10);

	return (
		<>
			<Affix offsetTop={top}>
				<div
					style={{
						height: "100px",
						width: "100px",
						background: "yellow",
					}}
				>
					Affix top {top}
				</div>
			</Affix>
			<br />
			<div
				style={{
					height: "200vh",
				}}
			/>
		</>
	);
};

export default App;

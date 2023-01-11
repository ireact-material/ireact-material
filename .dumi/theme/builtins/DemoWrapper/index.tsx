import React, { useState } from "react";
import { DumiDemoGrid } from "dumi";

const DemoWrapper: typeof DumiDemoGrid = ({ items }) => {
	const [expandAll] = useState(false);

	const visibleDemos = items.filter((item) => !item.previewerProps.debug);

	const filteredItems = visibleDemos.map((item) => ({
		...item,
		previewerProps: { ...item.previewerProps, expand: expandAll },
	}));

	console.log("items", items);
	return (
		<div className="demo-wrapper">
			{/* FIXME: find a new way instead of `key` to trigger re-render */}
			<DumiDemoGrid items={filteredItems} key={`${expandAll}`} />
		</div>
	);
};

export default DemoWrapper;
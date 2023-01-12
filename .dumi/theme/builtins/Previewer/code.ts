export const indexJsContent = `import React from 'react';
import { createRoot } from 'react-dom/client';
import Demo from './demo';

createRoot(document.getElementById('container')).render(<Demo />);
`;

export const demoJsContent = (
	importReactContent: string,
	parsedSourceCode: string,
) => `${importReactContent}
import './index.css';
${parsedSourceCode}
`;

export const html = `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="theme-color" content="#000000">
	</head>
	<body>
		<div id="container" style="padding: 24px" />
		<script>const mountNode = document.getElementById('container');</script>
	</body>
</html>
`;

export const importReactContent = (
	suffix: "tsx" | "js",
	sourceCodeTyped: string,
	sourceCode: string,
) => {
	let _importReactContent = "import React from 'react';";

	const importReactReg = /import React(\D*)from 'react';/;
	// 重新排序源代码
	let parsedSourceCode = suffix === "tsx" ? sourceCodeTyped : sourceCode;

	const matchImportReact = parsedSourceCode.match(importReactReg);

	if (matchImportReact) {
		[_importReactContent] = matchImportReact;
		parsedSourceCode = parsedSourceCode.replace(importReactReg, "").trim();
	}

	return [_importReactContent, parsedSourceCode];
};

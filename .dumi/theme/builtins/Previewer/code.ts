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

export const codepenPrefillConfig = (localizedTitle, sourceCode) => ({
	title: `${localizedTitle} `,
	html,
	js: `${"const { createRoot } = ReactDOM;\n"}${sourceCode
		.replace(
			/import\s+(?:React,\s+)?{(\s+[^}]*\s+)}\s+from\s+'react'/,
			`const { $1 } = React;`,
		)
		.replace(
			/import\s+{(\s+[^}]*\s+)}\s+from\s+'antd';/,
			"const { $1 } = antd;",
		)
		.replace(
			/import\s+{(\s+[^}]*\s+)}\s+from\s+'@ant-design\/icons';/,
			"const { $1 } = icons;",
		)
		.replace("import moment from 'moment';", "")
		.replace("import React from 'react';", "")
		.replace(
			/import\s+{\s+(.*)\s+}\s+from\s+'react-router';/,
			"const { $1 } = ReactRouter;",
		)
		.replace(
			/import\s+{\s+(.*)\s+}\s+from\s+'react-router-dom';/,
			"const { $1 } = ReactRouterDOM;",
		)
		.replace(/([A-Za-z]*)\s+as\s+([A-Za-z]*)/, "$1:$2")
		.replace(
			/export default/,
			"const ComponentDemo =",
		)}\n\ncreateRoot(mountNode).render(<ComponentDemo />);\n`,
	editors: "001",
	css: "",
	js_external: [
		"react@18/umd/react.development.js",
		"react-dom@18/umd/react-dom.development.js",
		"dayjs@1/dayjs.min.js",
		// `ireact-material@${version}/dist/ireact-material-with-locales.js`,
		// `@ant-design/icons/dist/index.umd.js`,
		"react-router-dom/dist/umd/react-router-dom.production.min.js",
		"react-router/dist/umd/react-router.production.min.js",
	]
		.map((url) => `https://unpkg.com/${url}`)
		.join(";"),
	js_pre_processor: "typescript",
});

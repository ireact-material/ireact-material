import rcWarning, { resetWarned } from "rc-util/lib/warning";

export { resetWarned };
export function noop() {}

// Warning
type Warning = (valid: boolean, component: string, message?: string) => void;

// eslint-disable-next-line import/no-mutable-exports
let warning: Warning = noop;

// 错误提示
if (process.env.NODE_ENV !== "production") {
	warning = (valid, component, message) => {
		rcWarning(valid, `[ireact: ${component}] ${message}`);
	};
}

export default warning;

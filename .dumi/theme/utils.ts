// eslint-disable-next-line import/prefer-default-export
export function getLocalizedPathname(
	path: string,
	zhCN?: boolean,
	search?: string,
	hash?: {
		zhCN?: string;
		enUS?: string;
	},
) {
	const pathname = path.startsWith("/") ? path : `/${path}`;
	let fullPath: string;
	if (!zhCN) {
		// to enUS
		fullPath = /\/?index-cn/.test(pathname) ? "/" : pathname.replace("-cn", "");
	} else if (pathname === "/") {
		fullPath = "/index";
	} else if (pathname.endsWith("/")) {
		fullPath = pathname.replace(/\/$/, "-cn/");
	} else {
		fullPath = `${pathname}`;
		fullPath = fullPath.replace(/(-cn)+/, "-cn");
	}

	if (hash) {
		const localHash = hash[zhCN ? "zhCN" : "enUS"];
		fullPath += `#${localHash}`;
	}

	return { pathname: fullPath, search };
}

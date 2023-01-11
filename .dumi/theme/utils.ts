// 获取本地化路径名
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
	}
	// index
	else if (pathname === "/") {
		fullPath = "/index-cn";
	}
	// cn
	else if (pathname.endsWith("/")) {
		fullPath = pathname.replace(/\/$/, "-cn/");
	}
	// cn
	else {
		fullPath = `${pathname}`;
		fullPath = fullPath.replace(/(-cn)+/, "-cn");
	}

	// 是否有hash
	if (hash) {
		const localHash = hash[zhCN ? "zhCN" : "enUS"];

		fullPath += `#${localHash}`;
	}

	return { pathname: fullPath, search };
}

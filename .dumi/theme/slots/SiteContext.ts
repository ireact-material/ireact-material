import * as React from "react";

// type
import type { DirectionType } from "ireact-material/es/config-provider/types";
import type { ThemeName } from "../common/ThemeSwitch";

export interface SiteContextProps {
	isMobile: boolean;
	direction: DirectionType;
	theme: ThemeName[];
	updateSiteConfig: (props: Partial<SiteContextProps>) => void;
}

const SiteContext = React.createContext<SiteContextProps>({
	isMobile: false,
	direction: "ltr",
	theme: ["light"],
	updateSiteConfig: () => {},
});

export default SiteContext;

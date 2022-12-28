import type { ReactNode } from "react";

import React from "react";

const Content: React.FC<{ children: ReactNode }> = ({ children }) => (
	<div>{children}</div>
);

export default Content;

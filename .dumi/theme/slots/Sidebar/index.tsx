import React from "react";
import { css } from "@emotion/react";

const useStyle = () => ({
	mainMenu: css`
    z-index: 1;
    .main-menu-inner {
      height: 100%;
      max-height: 100vh;
      overflow: hidden;
    }

    &:hover .main-menu-inner {
      overflow-y: auto;
    }

    > div,
    > div > div {
      height: 100%;
    }
  `,
});

const Sidebar: React.FC = () => {
	const styles = useStyle();

	return (
		<div css={styles.mainMenu}>
			<section style={{ width: "100%" }} className="main-menu-inner" />
		</div>
	);
};

export default Sidebar;

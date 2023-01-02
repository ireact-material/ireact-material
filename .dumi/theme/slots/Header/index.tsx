import React from "react";
import { css } from "@emotion/react";

import Logo from "./Logo";

const useStyle = () => ({
	headerWrapper: css`
		position: relative;
		z-index: 10;
    max-width: 100%;
    background: #ffffff;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 3%), 0 1px 6px -1px rgb(0 0 0 / 2%), 0 2px 4px 0 rgb(0 0 0 / 2%);
	`,
	header: css`
		display: flex;
		align-content: center;
		height: 64px;
		width: 95%;
		margin: 0 auto;
	`,
});

const Header: React.FC = () => {
	const style = useStyle();

	return (
		<header css={style.headerWrapper}>
			<div css={style.header}>
				<Logo />
			</div>
		</header>
	);
};

export default Header;

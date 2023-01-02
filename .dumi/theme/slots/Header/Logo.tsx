import * as React from "react";
import { css } from "@emotion/react";
import { Link } from "dumi";

const useStyle = () => ({
	logoWrapper: css`
		display: flex;
		align-items: center;
    font-size: 26px;

		img {
    	height: 40px;
  	}
	`,
});

const Logo = () => {
	const style = useStyle();

	return (
		<div css={style.logoWrapper}>
			<Link to="/">
				<img
					alt="logo"
					src="https://cdn.lovevuerk.com/plus/img/logo.92144542.png"
				/>
				<span>IReact Material</span>
			</Link>
		</div>
	);
};

export default Logo;

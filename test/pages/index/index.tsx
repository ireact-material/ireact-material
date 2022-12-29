import React from "react";
import { css } from "@emotion/react";
import { Link } from "dumi";

const useStyle = () => ({
	homeWrapper: css`
		flex: 1;
		width: 100%;
    height: 100%;
    background: url('https://cdn.lovevuerk.com/plus/img/home-bg.939999ee.jpg') no-repeat;
    background-position: center;
    background-size: cover;
	`,
});

const Homepage: React.FC = () => {
	const style = useStyle();

	return (
		<div css={style.homeWrapper}>
			<div className='home'>
				<Link to="/components/affix">跳转doc</Link>
			</div>
		</div>
	);
};

export default Homepage;

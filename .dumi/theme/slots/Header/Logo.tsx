import * as React from "react";
import { css } from "@emotion/react";
import { Link, useLocation } from "dumi";

// hooks
import useSiteToken from "../../../hooks/useSiteToken";

import * as utils from "../../utils";

const useStyle = () => {
	const { token } = useSiteToken();

	const { headerHeight, colorTextHeading } = token;

	return {
		logo: css`
      display: inline-flex;
      align-items: center;
      height: ${headerHeight}px;
      color: ${colorTextHeading};
      padding-left: 20px;
      font-size: 18px;
      white-space: nowrap;
      text-decoration: none;
      overflow: hidden;

      &:hover {
        color: ${colorTextHeading};
      }

      img {
        height: 32px;
        margin-right: 12px;
        vertical-align: middle;
      }
    `,
	};
};

export interface LogoProps {
	isZhCN: boolean;
	location: any;
}

const Logo = ({ isZhCN }: LogoProps) => {
	// 返回当前 location 对象
	const { search } = useLocation();

	// 样式
	const style = useStyle();

	return (
		<h1>
			<Link
				css={style.logo}
				to={utils.getLocalizedPathname("/", isZhCN, search)}
			>
				<img
					alt="logo"
					src="https://avatars.githubusercontent.com/u/121840434?s=200&v=4"
				/>
				<span style={{ lineHeight: "32px" }}>IReact Material</span>
			</Link>
		</h1>
	);
};

export default Logo;

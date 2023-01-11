import React from "react";
import { css, Global } from "@emotion/react";

import useSiteToken from "../../../hooks/useSiteToken";

export default () => {
	const { token } = useSiteToken();

	return (
		<Global
			styles={css`
        .markdown {
          color: ${token.colorText};
          font-size: 14px;
          line-height: 2;
        }

        .markdown h1 {
          margin-top: 8px;
          margin-bottom: 20px;
          color: ${token.colorTextHeading};
          font-weight: 500;
          font-size: 30px;
          font-family: Avenir, ${token.fontFamily}, sans-serif;
          line-height: 38px;
        }

        .markdown h2 {
          font-size: 24px;
          line-height: 32px;
        }

        .markdown h3 {
          font-size: 18px;
        }

        .markdown h4 {
          font-size: 16px;
        }

        .markdown h5 {
          font-size: 14px;
        }

        .markdown h6 {
          font-size: 12px;
        }

        .markdown h2,
        .markdown h3,
        .markdown h4,
        .markdown h5,
        .markdown h6 {
          clear: both;
          margin: 1.6em 0 0.6em;
          color: ${token.colorTextHeading};
          font-weight: 500;
          font-family: Avenir, ${token.fontFamily}, sans-serif;
        }

        .markdown p,
        .markdown pre {
          margin: 1em 0;
        }
      `}
		/>
	);
};

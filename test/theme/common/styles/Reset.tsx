import React from "react";
import { css, Global } from "@emotion/react";

export default () => (
	<Global
		styles={css`
        html {
          direction: initial;
        }

        body {
          overflow-x: hidden;
          color: rgba(0, 0, 0, 0.88);
          font-size: 14px;
          font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
          line-height: 1.5;
          background: #ffffff;
          transition: background 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }

        #root{
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
      `}
	/>
);

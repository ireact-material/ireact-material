import { css, Global } from "@emotion/react";
import React from "react";
import useSiteToken from "../../../hooks/useSiteToken";

export default () => {
	const { token } = useSiteToken();

	return (
		<Global
			styles={css`
        .code-box {
          position: relative;
          display: inline-block;
          width: 100%;
          margin: 0 0 16px;
          overflow: hidden;
          border: 1px solid ${token.colorSplit};
          border-radius: ${token.borderRadius}px;
          transition: all 0.2s;

          // demo
          &,
          .code-box-demo {
            background-color: ${token.colorBgContainer};
          }

          // 展开
          &.expand &-meta {
            border-bottom: 1px dashed ${token.colorSplit};
            border-radius: 0;
          }

          // demo
          &-demo {
            padding: 42px 24px;
            color: ${token.colorText};
            border-bottom: 1px solid ${token.colorSplit};
          }

          /* meta */
          &-meta {
            &.markdown {
              position: relative;
              width: 100%;
              font-size: ${token.fontSize}px;
              border-radius: 0 0 ${token.borderRadius}px ${token.borderRadius}px;
              transition: background-color 0.4s;
            }

            blockquote {
              line-height: 1.5;
            }

            h4,
            section& p {
              margin: 0;
            }

            > p {
              width: 100%;
              margin: 0.5em 0;
              padding-right: 25px;
              font-size: 12px;
              word-break: break-word;
            }
          }

          /* title */
          &-title {
            position: absolute;
            top: -14px;
            margin-left: 16px;
            padding: 1px 8px;
            color: #777;
            background: ${token.colorBgContainer};
            border-radius: ${token.borderRadius}px ${token.borderRadius}px 0 0;
            transition: background-color 0.4s;

            a,
            a:hover {
              color: ${token.colorText};
              font-weight: bold;
              font-size: ${token.fontSize}px;
            }
          }


          // 描述
          &-description {
            padding: 18px 24px 12px;
          }
        }
      `}
		/>
	);
};

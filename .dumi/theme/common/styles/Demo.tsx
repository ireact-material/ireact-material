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

          /* demo */
          &,
          .code-box-demo {
            background-color: ${token.colorBgContainer};
          }

          /* 展开 */
          &.expand &-meta {
            border-radius: 0;
          }

          /* demo */
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

          /* 描述 */
          &-description {
            padding: 18px 24px 12px;
          }

          /* 选择按钮 */
          &-actions {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 12px 0;
            border-top: 1px dashed ${token.colorSplit};
          }

          /* codesandbox */
          &-codesandbox {
            width: 16px;
            height: 16px;
            overflow: hidden;
            border: 0;
            cursor: pointer;
          }

          /* codepen */
          &-codepen {
            width: 14px;
            height: 14px;
            overflow: hidden;
            border: 0;
            cursor: pointer;
          }

          // 展开
          .code-expand-icon {
            position: relative;
            width: 16px;
            height: 16px;
            cursor: pointer;
          }

          .code-expand-icon-show,
          .code-expand-icon-hide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            max-width: 100%;
            margin: 0;
            box-shadow: none;
            transition: all 0.4s;
            user-select: none;
          }

          .code-expand-icon-show {
            pointer-events: auto;
          }

          .code-expand-icon-hide {
            opacity: 0;
            pointer-events: none;
          }

          &-actions &-code-action {
            position: relative;
            display: flex;
            align-items: center;
            /* width: 16px;
            height: 16px; */
            cursor: pointer;
            transition: all 0.24s;

            &:hover {
              color: ${token.colorText};
            }
          }

          &-code-action {
            margin: 0 10px;
          }

          /* 高亮 */
          .highlight-wrapper {
            display: none;
            overflow: auto;
            border-radius: 0 0 ${token.borderRadius}px ${token.borderRadius}px;

            &-expand {
              display: block;
            }
          }

          /* 高亮 */
          .highlight {
            position: relative;

            pre {
              margin: 0;
              padding: 0;
              background: ${token.colorBgContainer};
            }

            &:last-child {
              border-top: 1px dashed ${token.colorSplit};
            }
          }

          pre {
            width: auto;
            margin: 0;

            code {
              background: ${token.colorBgContainer};
              border: none;
              box-shadow: unset;
            }
          }

          .markdown {
            pre {
              margin: 0.5em 0;
              padding: 6px 12px;
            }

            pre code {
              margin: 0;
              background: #f5f5f5;
            }
          }
        }
      `}
		/>
	);
};

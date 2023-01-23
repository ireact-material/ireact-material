import React from 'react';
import { css, Global } from '@emotion/react';

import useSiteToken from '../../../hooks/useSiteToken';

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

        .markdown code {
          margin: 0 1px;
          padding: 0.2em 0.4em;
          font-size: 0.9em;
          background: ${token.siteMarkdownCodeBg};
          border: 1px solid ${token.colorSplit};
          border-radius: 3px;
        }

        .markdown .dumi-default-table {
          table {
            margin: 0;
            overflow-x: auto;
            overflow-y: hidden;
            direction: ltr;
            empty-cells: show;
            border: 1px solid ${token.colorSplit};
            border-collapse: collapse;
            border-spacing: 0;

            th,
            td {
              padding: 12px 24px;
              text-align: left;
              border: 1px solid ${token.colorSplit};

              /* &:first-child {
                border-left: 1px solid ${token.colorSplit};
              } */

              &:last-child {
                border-right: 1px solid ${token.colorSplit};
              }

              img {
                max-width: unset;
              }
            }

            th {
              color: #5c6b77;
              font-weight: 500;
              white-space: nowrap;
              background: rgba(0, 0, 0, 0.02);
              border-width: 1px 1px 2px;
            }

            tbody tr {
              transition: all 0.3s;

              &:hover {
                background: rgba(60, 90, 100, 0.04);
              }
            }
          }

          table.component-api-table {
            margin: 0;
            overflow-x: auto;
            overflow-y: hidden;
            font-size: ${Math.max(token.fontSize - 1, 12)}px;
            font-family: ${token.codeFamily};
            line-height: ${token.lineHeight};
            border: 1px solid ${token.colorSplit};
            border-width: 0 1px;

            th {
              border-width: 1px 0 2px;
            }

            td {
              border-width: 1px 0;

              &:first-of-type {
                width: 18%;
                min-width: 58px;
                color: #595959;
                font-weight: 600;
                white-space: nowrap;
              }

              &:nth-of-type(2) {
                width: 55%;
                min-width: 160px;
              }

              &:nth-of-type(3) {
                width: 22%;
                color: ${token['magenta-7']};
                font-size: ${Math.max(token.fontSize - 1, 12)}px;
              }

              &:nth-of-type(4) {
                width: 15%;
                font-size: ${Math.max(token.fontSize - 1, 12)}px;
              }

              &:nth-of-type(5) {
                width: 8%;
                font-size: ${Math.max(token.fontSize - 1, 12)}px;
              }

              &:nth-last-of-type(3):first-of-type {
                width: 38%;
              }

              &:nth-last-of-type(3):first-of-type ~ td:nth-last-of-type(2) {
                width: 70%;
              }
            }
          }
        }

        .markdown blockquote {
          margin: 1em 0;
          padding-left: 0.8em;
          color: ${token.colorTextSecondary};
          font-size: 90%;
          border-left: 4px solid ${token.colorSplit};

          .rtl & {
            padding-right: 0.8em;
            padding-left: 0;
            border-right: 4px solid ${token.colorSplit};
            border-left: none;
          }
        }

        .markdown blockquote p {
          margin: 0;
        }

        .markdown ul > li {
          margin-left: 20px;
          padding-left: 4px;
          list-style-type: circle;

          .rtl & {
            margin-right: 20px;
            margin-left: 0;
            padding-right: 4px;
            padding-left: 0;
          }

          &:empty {
            display: none;
          }
        }

        .markdown ol > li {
          margin-left: 20px;
          padding-left: 4px;
          list-style-type: decimal;
        }

        .markdown ul > li > p,
        .markdown ol > li > p {
          margin: 0.2em 0;
        }
      `}
    />
  );
};

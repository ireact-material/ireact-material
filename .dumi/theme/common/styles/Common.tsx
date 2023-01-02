import React from "react";
import { css, Global } from "@emotion/react";

export default () => (
	<Global
		styles={css`
      body,
      div,
      dl,
      dt,
      dd,
      ul,
      ol,
      li,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      pre,
      code,
      form,
      fieldset,
      legend,
      input,
      textarea,
      p,
      blockquote,
      th,
      td,
      hr,
      button,
      article,
      aside,
      details,
      figcaption,
      figure,
      footer,
      header,
      hgroup,
      menu,
      nav,
      section {
        margin: 0;
        padding: 0;
      }

      ul,
      ol {
        list-style: none;
      }

      img {
        vertical-align: middle;
        border-style: none;
      }

      a {
        text-decoration: none;
        outline: 0px;
        color: currentColor;
        will-change: color;
        transition: color 0.2s ease 0s;
        background: 0px 0px;
        cursor: pointer;
      }

      *,
      ::after,
      ::before {
        box-sizing: border-box;
        list-style: none;
        margin: 0;
        padding: 0;
      }
    `}
	/>
);

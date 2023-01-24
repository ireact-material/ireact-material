import { css } from '@emotion/react';
import React from 'react';
import { Link } from 'dumi';

const useStyle = () => ({
  wrapper: css`
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    padding-left: 15%;
    height: 100%;
    text-align: left;
    background: url('https://cdn.lovevuerk.com/plus/img/home-bg.939999ee.jpg') no-repeat;
    background-size: cover;
    background-position: 50%;
  `,
  titleWrapper: css`
    display: flex;
    align-items: center;

    img {
      height: 80px;
    }

    h1 {
      font-size: 60px;
    }
  `,
  desc: css`
    margin: 12px 10px !important;
    font-size: 24px;
  `,
  buttonWrapper: css`
    margin-top: 50px;
  `,
});

const Homepage: React.FC = (props) => {
  // 样式
  const styles = useStyle();

  return (
    <div css={styles.wrapper}>
      <div css={styles.titleWrapper}>
        <h1>IReact Material</h1>
      </div>
      <h2 css={styles.desc}>一套基于 Material Design 规范</h2>
      <h2 css={styles.desc}>UI组件库</h2>
      <div css={styles.buttonWrapper}>
        <Link
          to="/docs/react/introduce-cn"
        >
          查看组件
        </Link>
      </div>
    </div>
  );
};

export default Homepage;

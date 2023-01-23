import React, { useContext } from 'react';
import { css } from '@emotion/react';
import { useLocation } from 'dumi';
import classNames from 'classnames';
import { Col, Row } from 'ireact-material';

// hooks
import useSiteToken from '../../../hooks/useSiteToken';
import useLocale from '../../../hooks/useLocale';

// context
import SiteContext from '../SiteContext';

// type
import type { SiteContextProps } from '../SiteContext';

// component
import Logo from './Logo';
import Navigation from './Navigation';

// 样式
const useStyle = () => {
  const { token } = useSiteToken();

  return {
    header: css`
      position: relative;
      max-width: 100%;
      background: ${token.colorBgContainer};
      box-shadow: ${token.boxShadow};

      /* @media only screen and (max-width: ${token.mobileMaxWidth}px) {
        text-align: center;
      } */
    `,
    menuRow: css``,
  };
};

const Header: React.FC = () => {
  // 获取语言
  const [locale, lang] = useLocale();
  // 是否是客户端
  const [isClient, setIsClient] = React.useState(false);

  // 站点上下文
  const { isMobile, updateSiteConfig } = useContext<SiteContextProps>(SiteContext);

  const location = useLocation();
  const { pathname } = location;

  // 是否是主页
  const isHome = ['', 'index', 'index-cn'].includes(pathname);
  // 是否是主页
  const colProps = isHome
    ? [{ flex: 'none' }, { flex: 'auto' }]
    : [
        { xxl: 4, xl: 5, lg: 6, md: 6, sm: 24, xs: 24 },
        { xxl: 20, xl: 19, lg: 18, md: 18, sm: 0, xs: 0 },
      ];

  // 头部class
  const headerClassName = classNames({
    clearfix: true,
    'home-header': isHome,
  });

  const isZhCN = lang === 'cn';

  // 样式
  const style = useStyle();

  // 公共props
  const sharedProps = {
    isZhCN,
    isClient,
  };

  // 反应灵敏
  // const responsive: null | 'narrow' | 'crowded' = null;

  // const navigationNode = (
  //   <Navigation
  //     {...sharedProps}
  //     // responsive={responsive}
  //     // isMobile={isMobile}
  //     // onLangChange={onLangChange}
  //     // onDirectionChange={onDirectionChange}
  //     key="nav"
  //   />
  // );

  // const menu: (React.ReactElement | null)[] = [navigationNode];

  return (
    <header css={style.header} className={headerClassName}>
      <Row style={{ flexFlow: 'nowrap', height: 64 }}>
        <Col {...colProps[0]}>
          <Logo {...sharedProps} location={location} />
        </Col>
        {/* <Col {...colProps[1]} css={style.menuRow}>
          {menu}
        </Col> */}
      </Row>
    </header>
  );
};

export default Header;

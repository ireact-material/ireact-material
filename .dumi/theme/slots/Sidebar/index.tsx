import { css } from '@emotion/react';
import { Menu } from 'antd';
import { useSidebarData } from 'dumi';
import { Affix, Col, ConfigProvider } from 'ireact-material';
import React, { useContext } from 'react';

import SiteContext from '../SiteContext';

// hooks
import useMenu from '../../../hooks/useMenu';

const useStyle = () => ({
  mainMenu: css`
    z-index: 1;

    .main-menu-inner {
      height: 100%;
      max-height: 100vh;
      overflow: hidden;
    }

    &:hover .main-menu-inner {
      overflow-y: auto;
    }

    > div,
    > div > div {
      height: 100%;
    }
  `,
  asideContainer: css`
    min-height: 100%;
    padding-bottom: 48px;
  `,
});

const Sidebar: React.FC = () => {
  const styles = useStyle();

  const { isMobile } = useContext(SiteContext);

  // 菜单
  const [menuItems, selectedKey] = useMenu();
  // 获取当前路径下的侧边栏数据
  const sidebarData = useSidebarData();

  // 菜单
  const menuChild = (
    <ConfigProvider>
      <Menu
        items={menuItems}
        inlineIndent={30}
        css={styles.asideContainer}
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={sidebarData?.map(({ title }) => title).filter((item) => item) as string[]}
      />
    </ConfigProvider>
  );

  return isMobile ? null : (
    <Col xxl={4} xl={5} lg={6} md={6} sm={24} xs={24} css={styles.mainMenu}>
      <Affix>
        <section style={{ width: '100%' }} className="main-menu-inner">
          {menuChild}
        </section>
      </Affix>
    </Col>
  );
};

export default Sidebar;

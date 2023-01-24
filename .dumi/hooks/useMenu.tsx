import { Link, useFullSidebarData, useSidebarData } from 'dumi';
import { ReactNode, useMemo } from 'react';
import useLocation from './useLocation';

// type
import type { MenuProps } from 'antd';

export type UseMenuOptions = {
  before?: ReactNode;
  after?: ReactNode;
};

const useMenu = (options: UseMenuOptions = {}): [MenuProps['items'], string] => {
  // 获取所有路径下的侧边栏数据
  const fullData = useFullSidebarData();
  // 返回当前 location 对象
  const { pathname, search } = useLocation();
  // 获取当前路径下的侧边栏数据
  const sidebarData = useSidebarData();

  const { before, after } = options;

  const menuItems = useMemo<MenuProps['items']>(() => {
    // 获取当前路径下的侧边栏数据
    const sidebarItems = [...(sidebarData ?? [])];

    return (
      sidebarItems?.reduce<Exclude<MenuProps['items'], undefined>>((result, group) => {
        // 有标题
        if (group.title) {
          result.push({
            type: 'group',
            // 组件归属标题
            label: group?.title,
            key: group?.title,
            // 有子节点
            children: group.children?.map((item) => ({
              label: (
                <Link to={`${item.link}${search}`}>
                  {before}
                  <span key="english">{item?.title}</span>
                  {/* 副标题 */}
                  <span className="chinese" key="chinese">
                    {(item.frontmatter as any).subtitle}
                  </span>
                  {after}
                </Link>
              ),
              key: item.link.replace(/(-cn$)/g, ''),
            })),
          });
        } else {
          const list = group.children || [];

          // 如果有 date 字段，我们就对其进行排序
          if (list.every((info) => info?.frontmatter?.date)) {
            list.sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));
          }

          result.push(
            ...list.map((item) => ({
              label: (
                <Link to={`${item.link}${search}`}>
                  {before}
                  {item?.title}
                  {after}
                </Link>
              ),
              key: item.link.replace(/(-cn$)/g, ''),
            })),
          );
        }

        return result;
      }, []) ?? []
    );
  }, [sidebarData, fullData, pathname, search]);

  return [menuItems, pathname];
};

export default useMenu;

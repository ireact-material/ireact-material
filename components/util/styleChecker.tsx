import canUseDom from 'rc-util/lib/Dom/canUseDom';

// 是否是有window
export const canUseDocElement = () => canUseDom() && window.document.documentElement;

let flexGapSupported: boolean | undefined;

// 检测 FlexGap 支持
export const detectFlexGapSupported = () => {
  if (!canUseDocElement()) {
    return false;
  }

  // 返回是否支持
  if (flexGapSupported !== undefined) {
    return flexGapSupported;
  }

  // 创建 flex 容器 设置 row-gap
  const flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  // 行间距
  flex.style.rowGap = '1px';

  // 在其中创建两个元素
  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  // 添加到 DOM（需要获得 scrollHeight）
  document.body.appendChild(flex);
  // flex 容器 应该比 row-gap 高 1px
  flexGapSupported = flex.scrollHeight === 1;
  // 删除节点
  document.body.removeChild(flex);

  return flexGapSupported;
};

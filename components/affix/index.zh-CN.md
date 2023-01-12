---
category: Components
title: Affix
subtitle: 图钉
demo:
  cols: 2
group:
  title: 其他
  order: 7
---

使用图钉，可以将内容固定在屏幕上，并且不随页面的滚动而滚动。常用于侧边菜单等

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx" >基础用法</code>
<code src="./demo/offset-top.tsx" >顶部偏移</code>
<code src="./demo/offset-bottom.tsx" >固定在底部</code>
<code src="./demo/on-change.tsx" >固定状态改变时的回调</code>
<code src="./demo/target.tsx" >滚动容器</code>

## API

## Props

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | number | 0 |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | number | - |
| target | 设置 `Affix` 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | () => HTMLElement | () => window |

## Events

| 成员     | 说明                         | 类型                        | 默认值 |
| -------- | ---------------------------- | --------------------------- | ------ |
| onChange | 固定状态改变时触发的回调函数 | (affixed?: boolean) => void | -      |

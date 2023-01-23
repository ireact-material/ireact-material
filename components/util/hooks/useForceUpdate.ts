import * as React from 'react';

// 返回当前的 state 以及与其配套的 dispatch 方法
export default function useForceUpdate() {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  return forceUpdate;
}

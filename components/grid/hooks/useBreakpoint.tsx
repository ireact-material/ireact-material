import * as React from "react";

// 焦点更新
import useForceUpdate from "../../util/hooks/useForceUpdate";
// 监听视图变化
import useResponsiveObserver from "../../util/responsiveObserver";

// type
import type { ScreenMap } from "../../util/responsiveObserver";

function useBreakpoint(refreshOnChange: boolean = true): ScreenMap {
	// 视图对象
	const screensRef = React.useRef<ScreenMap>({});

	// 更新视图
	const forceUpdate = useForceUpdate();
	// 监听视图变化
	const responsiveObserver = useResponsiveObserver();

	// effect 将在每轮渲染结束后执行
	React.useEffect(() => {
		// 订阅事件
		const token = responsiveObserver.subscribe((supportScreens) => {
			// 视图对象
			screensRef.current = supportScreens;

			if (refreshOnChange) {
				forceUpdate();
			}
		});

		// 删除订阅者
		return () => responsiveObserver.unsubscribe(token);
	}, []);

	return screensRef.current;
}

export default useBreakpoint;

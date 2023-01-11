// 一个用于颜色操作和转换的小型库
import { TinyColor } from "@ctrl/tinycolor";

// 生成透明度颜色
export const getAlphaColor = (bgBaseColor: string, alpha: number) =>
	new TinyColor(bgBaseColor).setAlpha(alpha).toString();

// 生成边框颜色
export const getSolidColor = (baseColor: string, brightness: number) => {
	const instance = new TinyColor(baseColor);

	// 使颜色变浅一定量
	// 从 0 到 100
	// 提供 100 将始终返回白色
	return instance.darken(brightness).toHexString();
};

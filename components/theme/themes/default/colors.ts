import { generate } from "@ant-design/colors";

// 颜色算法
import { getAlphaColor } from "./colorAlgorithm";

// type
import type { GenerateColorMap, GenerateNeutralColorMap } from "../ColorMap";

/**
 * 生成调色版
 * @param baseColor 需要生成的颜色
 */
export const generateColorPalettes: GenerateColorMap = (baseColor: string) => {
	const colors = generate(baseColor);

	return {
		1: colors[0],
		2: colors[1],
		3: colors[2],
		4: colors[3],
		5: colors[4],
		6: colors[5],
		7: colors[6],
		8: colors[7],
		9: colors[8],
		10: colors[9],
	};
};

// 生成公共颜色调色版
export const generateNeutralColorPalettes: GenerateNeutralColorMap = (
	bgBaseColor: string,
	textBaseColor: string,
) => {
	// 背景颜色
	// const colorBgBase = bgBaseColor || '#fff';
	// 文字颜色
	const colorTextBase = textBaseColor || "#000";

	return {
		colorTextQuaternary: getAlphaColor(colorTextBase, 0.25),
	};
};

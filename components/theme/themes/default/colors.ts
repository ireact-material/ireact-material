import { generate } from "@ant-design/colors";

// type
import type { GenerateColorMap } from "../ColorMap";

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
export const generateNeutralColorPalettes = () => {};

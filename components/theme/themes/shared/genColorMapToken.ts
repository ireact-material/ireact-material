// type
import type { ColorMapToken, SeedToken } from "../../interface";

// 彩色变量
export default function genColorMapToken(
	// 基础变量
	seed: SeedToken,
) {
	const { colorInfo: colorInfoBase } = seed;

	console.log(seed);

	// const infoColors = generateColorPalettes(colorInfoBase);

	// return {
	//   colorInfoText: infoColors[9],
	// };
}

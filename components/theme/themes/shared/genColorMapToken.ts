// type
import type { GenerateColorMap } from "../colorMap";
import type { SeedToken } from "../../interface";

interface PaletteGenerators {
	generateColorPalettes: GenerateColorMap;
	// generateNeutralColorPalettes: GenerateNeutralColorMap;
}

// 彩色变量
export default function genColorMapToken(
	// 基础变量
	seed: SeedToken,
	{
		// 生成调色板
		generateColorPalettes,
		// 生成公共调色板
		// generateNeutralColorPalettes,
	}: PaletteGenerators,
) {
	const {
		// 信息颜色基础颜色
		colorInfo: colorInfoBase,
	} = seed;

	// 信息颜色
	const infoColors = generateColorPalettes(colorInfoBase);

	return {
		// 信息颜色
		colorInfoText: infoColors[5],
	};
}

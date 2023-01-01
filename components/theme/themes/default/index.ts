import { generate } from "@ant-design/colors";

// 预设调色板
import { defaultPresetColors } from "../seed";

// 生成调色版
import genColorMapToken from "../shared/genColorMapToken";
// 公共变量
import genCommonMapToken from "../shared/genCommonMapToken";

// 生成调色版
import { generateColorPalettes } from "./colors";

// type
import type {
	SeedToken,
	MapToken,
	PresetColorType,
	ColorPalettes,
} from "../../interface";

/**
 * 导出梯度变量
 *
 * @param token 基础变量
 * @returns 梯度变量
 */
export default function derivative(token: SeedToken): MapToken {
	const colorPalettes = Object.keys(defaultPresetColors)
		.map((colorKey: keyof PresetColorType) => {
			// 生成色版
			const colors = generate(token[colorKey]);

			return new Array(10).fill(1).reduce((prev, _, i) => {
				prev[`${colorKey}-${i + 1}`] = colors[i];

				return prev;
			}, {}) as ColorPalettes;
		})
		// 循环合并对象
		.reduce((prev, cur) => {
			// 合并对象
			prev = {
				...prev,
				...cur,
			};

			return prev;
		}, {} as ColorPalettes);

	return {
		// 变量
		...token,
		...colorPalettes,

		// 生成调色版
		...genColorMapToken(token, {
			generateColorPalettes,
		}),

		// 公共变量
		...genCommonMapToken(token),
	};
}

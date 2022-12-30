import { generate } from "@ant-design/colors";

// 预设调色板
import { defaultPresetColors } from "../seed";

// 共享颜色
import genColorMapToken from "../shared/genColorMapToken";

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

	genColorMapToken(token);
	return {
		...colorPalettes,

		colorInfoText: "red",
		// ...genColorMapToken(token),

		...token,
	};
}

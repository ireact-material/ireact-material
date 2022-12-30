// 组件token
import type { ComponentTokenMap } from "./components";
// 别名变量
import type { AliasToken } from "./alias";

// 需要覆盖的变量
export type OverrideToken = {
	[key in keyof ComponentTokenMap]: Partial<ComponentTokenMap[key]> &
		Partial<AliasToken>;
};

// 别名变量 & 组件的名称
export type GlobalToken = AliasToken & ComponentTokenMap;

// 预设颜色
export { presetColors } from "./presetColors";

// 预设颜色 | 颜色梯度
export type { PresetColorType, ColorPalettes } from "./presetColors";

// 基础变量
export type { SeedToken } from "./seeds";

// 变量类型
export type {
	MapToken,
	ColorMapToken,
	ColorNeutralMapToken,
	CommonMapToken,
	HeightMapToken,
	SizeMapToken,
	FontMapToken,
	StyleMapToken,
} from "./maps";

// 导出别名变量
export type { AliasToken } from "./alias";
export type { ComponentTokenMap } from "./components";

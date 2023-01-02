import type { PresetColorType, SeedToken } from "../internal";

// 预设调色板
export const defaultPresetColors: PresetColorType = {
	blue: "#1677ff",
	purple: "#722ED1",
	cyan: "#13C2C2",
	green: "#52C41A",
	magenta: "#EB2F96",
	pink: "#eb2f96",
	red: "#F5222D",
	orange: "#FA8C16",
	yellow: "#FADB14",
	volcano: "#FA541C",
	geekblue: "#2F54EB",
	gold: "#FAAD14",
	lime: "#A0D911",
};

// 基础变量
const seedToken: SeedToken = {
	// 预设调色板
	...defaultPresetColors,

	// 信息颜色
	colorInfo: "#5B8EFF",

	// 基础颜色
	colorTextBase: "",
	colorBgBase: "",

	// zIndex
	zIndexBase: 0,

	// 动画时间
	motionUnit: 0.1,
	motionBase: 0,
};

export default seedToken;

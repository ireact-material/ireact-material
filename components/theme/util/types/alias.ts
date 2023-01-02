// type
// 别名变量
import type { AliasToken, MapToken, OverrideToken } from "../../types";

// Raw merge of `@ant-design/cssinjs` token. Which need additional process
// 合并原始变量
export type RawMergedToken = MapToken &
	OverrideToken & { override: Partial<AliasToken> };

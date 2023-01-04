import type { FullToken } from "../../../theme/internal";

export interface AffixToken extends FullToken<"Affix"> {
	zIndexPopup: number;
}

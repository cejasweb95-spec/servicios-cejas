import type { CurrencyCode, MarketId } from "@/lib/content/schema";

export const marketCurrency: Record<MarketId, CurrencyCode> = {
  colombia: "COP",
  "espana-europa": "EUR",
  suiza: "CHF",
};

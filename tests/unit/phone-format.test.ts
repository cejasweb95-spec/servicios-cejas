import { describe, expect, it } from "vitest";

import { formatPhoneNumber } from "@/lib/format/phone";

describe("formatPhoneNumber", () => {
  it("formats the confirmed Colombia contact", () => {
    expect(formatPhoneNumber("573167742299")).toBe("+57 316 774 2299");
  });

  it("formats the confirmed Spain and Europe contact", () => {
    expect(formatPhoneNumber("+34 603 804 837")).toBe("+34 603 80 48 37");
  });

  it("keeps unknown E.164 values usable", () => {
    expect(formatPhoneNumber("+41791234567")).toBe("+41791234567");
  });
});

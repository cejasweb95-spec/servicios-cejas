import { describe, expect, it } from "vitest";

import { fitMetadataTitle } from "@/lib/seo/fit-metadata-title";

describe("fitMetadataTitle", () => {
  it("keeps concise branded titles", () => {
    expect(
      fitMetadataTitle("Efecto polvo en Colombia | Cejas Internacionales"),
    ).toBe("Efecto polvo en Colombia | Cejas Internacionales");
  });

  it("removes only the brand suffix from long titles", () => {
    expect(
      fitMetadataTitle(
        "Curso profesional de micropigmentacion y neutralizacion labial | Formación Cejas Internacionales",
      ),
    ).toBe(
      "Curso profesional de micropigmentacion y neutralizacion labial",
    );
  });

  it("does not truncate an unknown title", () => {
    const title = "A title that should remain semantically complete even when it is deliberately long";
    expect(fitMetadataTitle(title)).toBe(title);
  });
});

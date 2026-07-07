import { legalProfileSchema, type LegalProfile } from "@/lib/content/schema";

const l = (es: string, en: string) => ({ es, en });

export const legalProfile = legalProfileSchema.parse({
  ownerName: "Xiomara Andrea Sánchez Noreña",
  brandName: "Cejas Internacionales",
  taxId: "1.144.186.472-5",
  address: l(
    "Calle 9 # 32 A 16, local 118, barrio El Templete, Cali, Valle del Cauca, Colombia",
    "Calle 9 # 32 A 16, local 118, El Templete neighborhood, Cali, Valle del Cauca, Colombia",
  ),
  email: "contacto@cejasinternacionales.com",
  phoneColombia: "3167742299",
  note: l(
    "La dirección legal publicada corresponde únicamente a Cali, Colombia.",
    "The published legal address is only in Cali, Colombia.",
  ),
} satisfies LegalProfile);

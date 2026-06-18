import { whatsappTargetSchema, type WhatsAppTarget } from "@/lib/content/schema";

const l = (es: string, en: string) => ({ es, en });

export const whatsappTargets = whatsappTargetSchema.array().parse([
  {
    id: "colombia",
    label: l("WhatsApp Colombia", "Colombia WhatsApp"),
    phoneE164: "573167742299",
    defaultMessage: l(
      "Hola, quiero información sobre Cejas Internacionales en Colombia.",
      "Hello, I would like information about Cejas Internacionales in Colombia.",
    ),
  },
  {
    id: "europa",
    label: l(
      "WhatsApp España / Europa / Suiza",
      "Spain / Europe / Switzerland WhatsApp",
    ),
    phoneE164: "34603804837",
    defaultMessage: l(
      "Hola, quiero información sobre Cejas Internacionales.",
      "Hello, I would like information about Cejas Internacionales.",
    ),
  },
] satisfies WhatsAppTarget[]);

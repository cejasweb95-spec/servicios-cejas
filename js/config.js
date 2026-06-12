/**
 * Configuración del sitio — edita aquí antes de publicar en Hostinger
 */

/** Dominio final (sin barra final). Ej: "https://cejasinternacionales.com" */
export const SITE_URL = "https://cejasinternacionales.com";

export const SITE_NAME = "Cejas Internacionales";

export const WHATSAPP_NUMBER = "34603804837";

export const WHATSAPP_DISPLAY = "+34 603 80 48 37";

export const WHATSAPP_MESSAGE =
  "Hola, quiero reservar o pedir información sobre micropigmentación en Cejas Internacionales.";

/** Dejar vacío o con placeholder hasta tener perfil real */
export const INSTAGRAM_URL = "";

export function getWhatsAppUrl() {
  const text = encodeURIComponent(WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

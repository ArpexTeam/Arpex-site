export const WHATSAPP_NUMBER_E164 = "5519988935849";
export const WHATSAPP_DISPLAY = "(19) 98893-5849";
export const CONTACT_EMAIL = "contatoarpextech@gmail.com";
export const INSTAGRAM_URL = "https://instagram.com/arpextechnology/";
export const INSTAGRAM_HANDLE = "@arpextechnology";
export const SITE_URL = "https://arpex-site.vercel.app";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(message)}`;
}

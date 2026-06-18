import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

import { defaultLocale, isLocale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  if (requested && !isLocale(requested)) {
    notFound();
  }

  const locale = requested ?? defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

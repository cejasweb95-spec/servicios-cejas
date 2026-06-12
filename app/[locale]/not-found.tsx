import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main className="section" style={{ textAlign: "center", minHeight: "60vh" }}>
      <div className="container">
        <h1 className="section__title">{t("title")}</h1>
        <p className="section__text" style={{ marginBottom: "1.5rem" }}>
          {t("text")}
        </p>
        <Link href="/" className="btn btn--primary">
          {t("back")}
        </Link>
      </div>
    </main>
  );
}

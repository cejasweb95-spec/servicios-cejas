import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section" style={{ textAlign: "center", minHeight: "60vh" }}>
      <div className="container">
        <h1 className="section__title">Página no encontrada</h1>
        <p className="section__text" style={{ marginBottom: "1.5rem" }}>
          La página que buscas no existe o aún no está disponible.
        </p>
        <Link href="/" className="btn btn--primary">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}

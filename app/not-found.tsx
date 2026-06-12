import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1>Página no encontrada / Page not found</h1>
        <p style={{ margin: "1rem 0" }}>
          <Link href="/">Volver al inicio</Link> ·{" "}
          <Link href="/en">Back to home</Link>
        </p>
      </body>
    </html>
  );
}

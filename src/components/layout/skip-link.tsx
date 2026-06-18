type SkipLinkProps = {
  label: string;
  href?: string;
};

export function SkipLink({ href = "#contenido", label }: SkipLinkProps) {
  return (
    <a
      className="sr-only z-50 rounded-full bg-secondary px-4 py-2 text-secondary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      href={href}
    >
      {label}
    </a>
  );
}

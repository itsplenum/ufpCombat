interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Structured data (schema.org) embebido en la página. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

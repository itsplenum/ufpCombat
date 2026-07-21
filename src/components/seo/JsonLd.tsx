interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Structured data (schema.org) embedded in the page. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

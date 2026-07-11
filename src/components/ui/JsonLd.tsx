type JsonLdProps = Readonly<{
  id: string;
  data: Record<string, unknown>;
}>;

/** Server-rendered JSON-LD block. */
export function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

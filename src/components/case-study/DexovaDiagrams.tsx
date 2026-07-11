/**
 * Labeled diagrams for the Dexova case studies. These are reconstructions
 * drawn from the real system structure — captioned as diagrams, never
 * presented as screenshots.
 */

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const INK = "#f2f0ea";
const MUTED = "#9ca3af";

function Caption({ children }: Readonly<{ children: string }>) {
  return (
    <figcaption className="border-t border-line px-4 py-2 font-mono text-xs text-muted">
      {children}
    </figcaption>
  );
}

export function DexovaArchitectureDiagram() {
  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-surface">
      <svg
        viewBox="0 0 800 430"
        role="img"
        aria-label="Diagram arsitektur Dexova: tiga aplikasi (dex-fe, dex-attendance, dex-pos) memanggil satu API Go modular berisi modul Core, HRIS, POS, dan Inventory, yang membaca PostgreSQL dan Redis serta terintegrasi dengan Midtrans dan penyedia AI"
        className="block w-full"
        fontFamily={MONO}
      >
        {/* App surfaces */}
        {[
          { x: 40, label: "dex-fe", sub: "dashboard admin · Next.js" },
          { x: 290, label: "dex-attendance", sub: "PWA karyawan" },
          { x: 540, label: "dex-pos", sub: "aplikasi kasir" },
        ].map((s) => (
          <g key={s.label}>
            <line x1={s.x + 110} y1={88} x2={400} y2={140} stroke="#d97757" strokeWidth={1.5} />
            <rect x={s.x} y={24} width={220} height={64} rx={10} fill="#1b222d" stroke="#2b3442" />
            <text x={s.x + 110} y={52} textAnchor="middle" fontSize={15} fontWeight={600} fill={INK}>
              {s.label}
            </text>
            <text x={s.x + 110} y={72} textAnchor="middle" fontSize={11} fill={MUTED}>
              {s.sub}
            </text>
          </g>
        ))}

        {/* API core */}
        <rect x={110} y={140} width={580} height={120} rx={12} fill="#2a201b" stroke="#d97757" />
        <text x={400} y={168} textAnchor="middle" fontSize={15} fontWeight={600} fill={INK}>
          Go API — modular monolith (clean architecture)
        </text>
        {["Core", "HRIS", "POS", "Inventory"].map((m, i) => (
          <g key={m}>
            <rect x={140 + i * 132} y={188} width={116} height={48} rx={8} fill="#1b222d" stroke="#2b3442" />
            <text x={198 + i * 132} y={217} textAnchor="middle" fontSize={13} fill={INK}>
              {m}
            </text>
          </g>
        ))}

        {/* Data stores */}
        <line x1={280} y1={260} x2={230} y2={310} stroke="#d97757" strokeWidth={1.5} />
        <line x1={520} y1={260} x2={570} y2={310} stroke="#d97757" strokeWidth={1.5} />
        <rect x={110} y={310} width={250} height={62} rx={10} fill="#1b222d" stroke="#2b3442" />
        <text x={235} y={337} textAnchor="middle" fontSize={14} fontWeight={600} fill={INK}>
          PostgreSQL
        </text>
        <text x={235} y={356} textAnchor="middle" fontSize={11} fill={MUTED}>
          sqlc · migrasi per modul
        </text>
        <rect x={440} y={310} width={250} height={62} rx={10} fill="#1b222d" stroke="#2b3442" />
        <text x={565} y={337} textAnchor="middle" fontSize={14} fontWeight={600} fill={INK}>
          Redis
        </text>
        <text x={565} y={356} textAnchor="middle" fontSize={11} fill={MUTED}>
          cache · job queue async
        </text>

        <text x={400} y={412} textAnchor="middle" fontSize={11} fill={MUTED}>
          integrasi: Midtrans (QRIS) · OpenAI / Google AI · SSE + WebSocket · gRPC client (workshop)
        </text>
      </svg>
      <Caption>Diagram arsitektur — rekonstruksi struktur sistem, bukan tangkapan layar.</Caption>
    </figure>
  );
}

export function PosFlowDiagram() {
  const steps = [
    { label: "Buka shift", sub: "kas awal" },
    { label: "Transaksi", sub: "barcode · varian · hold" },
    { label: "Pembayaran", sub: "tunai · QRIS · split" },
    { label: "Tutup shift", sub: "hitung kas fisik" },
    { label: "Rekonsiliasi", sub: "sistem vs fisik" },
  ];
  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-surface">
      <svg
        viewBox="0 0 800 200"
        role="img"
        aria-label="Diagram alur shift kasir Dexova POS: buka shift dengan kas awal, transaksi, pembayaran, tutup shift, lalu rekonsiliasi kas sistem terhadap kas fisik; void dan retur mengembalikan stok secara otomatis"
        className="block w-full"
        fontFamily={MONO}
      >
        {steps.map((s, i) => (
          <g key={s.label}>
            <rect
              x={20 + i * 156}
              y={40}
              width={136}
              height={64}
              rx={10}
              fill={i === 4 ? "#2a201b" : "#1b222d"}
              stroke={i === 4 ? "#d97757" : "#2b3442"}
            />
            <text x={88 + i * 156} y={68} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>
              {s.label}
            </text>
            <text x={88 + i * 156} y={88} textAnchor="middle" fontSize={10.5} fill={MUTED}>
              {s.sub}
            </text>
            {i < steps.length - 1 && (
              <path
                d={`M ${156 + i * 156} 72 l 16 0 m -5 -5 l 5 5 l -5 5`}
                stroke="#d97757"
                strokeWidth={1.5}
                fill="none"
              />
            )}
          </g>
        ))}
        <path d="M 322 104 v 40 h -120" stroke="#2b3442" strokeWidth={1.5} fill="none" />
        <text x={410} y={168} textAnchor="middle" fontSize={11} fill={MUTED}>
          void / retur → stok kembali otomatis (sinkron modul Inventory)
        </text>
      </svg>
      <Caption>Diagram alur — rekonstruksi, bukan tangkapan layar aplikasi kasir.</Caption>
    </figure>
  );
}

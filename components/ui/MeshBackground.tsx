/**
 * MeshBackground — the ambient pastel gradient mesh behind the whole page.
 * Soft lilac / peach / mint blooms on warm ivory. Pure CSS, fixed, decorative.
 * Sits at the very back (z -10); everything else renders over it.
 */
export function MeshBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-ivory">
      {/* Drifting mesh blobs */}
      <div
        className="absolute inset-0 animate-mesh opacity-70"
        style={{
          backgroundImage: [
            "radial-gradient(38rem 30rem at 12% 8%, rgba(220,201,242,0.55), transparent 60%)",
            "radial-gradient(34rem 30rem at 88% 14%, rgba(248,216,196,0.55), transparent 60%)",
            "radial-gradient(40rem 34rem at 78% 82%, rgba(200,236,216,0.5), transparent 62%)",
            "radial-gradient(32rem 28rem at 18% 88%, rgba(230,220,205,0.5), transparent 60%)",
          ].join(","),
        }}
      />
      {/* Warm wash to keep contrast gentle and premium */}
      <div className="absolute inset-0 bg-ivory/40" />
    </div>
  );
}

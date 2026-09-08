export default function EmptyState() {
  return (
    <div style={{ padding: "80px 40px", maxWidth: 520 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, margin: "0 0 12px" }}>
        Pick an algorithm to begin
      </h1>
      <p style={{ color: "var(--ink-soft)" }}>
        Every algorithm in the index is available to you - none of them are locked. Choose
        your explanation depth with the gauge on the right of each page, and switch it
        whenever you like.
      </p>
    </div>
  );
}

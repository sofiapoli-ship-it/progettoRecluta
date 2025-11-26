export function Avatar({ size = 40 }) {
  return (
    <div
      className="rounded-full bg-neutral-700"
      style={{ width: size, height: size }}
    />
  );
}
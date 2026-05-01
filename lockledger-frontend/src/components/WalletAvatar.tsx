import { useMemo } from "react";

function generateColors(address: string): string[] {
  let hash = 0;
  for (let i = 0; i < address.length; i++) {
    hash = address.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [];
  for (let i = 0; i < 3; i++) {
    const h = (hash + i * 137) % 360;
    colors.push(`hsl(${h}, 70%, 55%)`);
  }
  return colors;
}

export function WalletAvatar({ address, size = 32 }: { address: string; size?: number }) {
  const colors = useMemo(() => generateColors(address), [address]);

  return (
    <div
      className="rounded-full flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
      }}
    />
  );
}

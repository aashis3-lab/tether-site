/**
 * Stylized street map in the app's map colors (switches with the theme).
 * Drawn on a 390×891 canvas (a full-bleed phone screen). `variant` changes the grid angle,
 * park and river so no two mockups share the same map.
 */
export function MapArt({ variant }: { variant: keyof typeof variants }) {
  const v = variants[variant];
  const blocks: React.ReactNode[] = [];
  for (let i = -4; i < 9; i++) {
    for (let j = -6; j < 16; j++) {
      const x = i * v.bw;
      const y = j * v.bh;
      if (v.park && i === v.park[0] && j >= v.park[1] && j <= v.park[1] + 1) continue;
      blocks.push(<rect key={`${i}:${j}`} x={x + 7} y={y + 4} width={v.bw - 14} height={v.bh - 8} rx="3" fill="var(--m-block)" />);
    }
  }
  return (
    <svg viewBox="0 0 390 891" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <rect width="390" height="891" fill="var(--m-road)" />
      <g transform={`translate(${v.ox} ${v.oy}) rotate(${v.angle})`}>
        {blocks}
        {v.park && (
          <rect x={v.park[0] * v.bw + 7} y={v.park[1] * v.bh + 4} width={v.bw - 14} height={v.bh * 2 - 8} rx="6" fill="var(--m-park)" />
        )}
        {/* a diagonal avenue */}
        <path d={v.diag} stroke="var(--m-road-edge)" strokeWidth="20" fill="none" />
        <path d={v.diag} stroke="var(--m-road)" strokeWidth="16" fill="none" />
      </g>
      {v.river && <path d={v.river} fill="var(--m-water)" />}
      {v.labels.map(([x, y, r, t]) => (
        <text key={t} x={x} y={y} transform={`rotate(${r} ${x} ${y})`} fontSize="10" fontWeight="500" fill="var(--m-label)" letterSpacing="0.3">
          {t}
        </text>
      ))}
    </svg>
  );
}

const variants = {
  union: {
    angle: -29,
    ox: -120,
    oy: 140,
    bw: 118,
    bh: 64,
    park: [2, 4] as [number, number] | null,
    diag: "M-200 -100 L 560 1100",
    river: null as string | null,
    labels: [
      [44, 262, -29, "E 15th St"],
      [210, 610, -29, "E 14th St"],
      [300, 230, 61, "Park Ave S"],
      [238, 470, 0, "Union Sq"],
    ] as [number, number, number, string][],
  },
  east: {
    angle: 12,
    ox: -30,
    oy: -40,
    bw: 90,
    bh: 58,
    park: null as [number, number] | null,
    diag: "M-100 600 L 500 200",
    river: null as string | null,
    labels: [] as [number, number, number, string][],
  },
  river: {
    angle: -20,
    ox: -60,
    oy: 60,
    bw: 104,
    bh: 72,
    park: [4, 7] as [number, number] | null,
    diag: "M-300 900 L 700 -100",
    river: "M390 0 L390 891 L330 891 C318 700 352 520 340 360 C330 220 350 90 370 0 Z",
    labels: [
      [30, 330, -20, "Bleecker St"],
      [120, 640, -20, "W 4th St"],
      [196, 196, 70, "6th Ave"],
      [352, 520, 84, "Hudson River"],
    ] as [number, number, number, string][],
  },
};

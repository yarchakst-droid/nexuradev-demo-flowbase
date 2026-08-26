import type { AutomationConnection, AutomationNode } from "@/lib/types";

function connectorPath(from: AutomationNode, to: AutomationNode): string {
  const midX = from.x + (to.x - from.x) / 2;
  return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
}

export default function ConnectorLines({
  nodes,
  connections,
  activeIds,
}: {
  nodes: AutomationNode[];
  connections: AutomationConnection[];
  activeIds: Set<string>;
}) {
  const byId = new Map(nodes.map((n) => [n.id, n]));

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 size-full"
    >
      {connections.map((c) => {
        const from = byId.get(c.from);
        const to = byId.get(c.to);
        if (!from || !to) return null;
        const active = activeIds.has(c.from) && activeIds.has(c.to);
        return (
          <path
            key={`${c.from}-${c.to}`}
            d={connectorPath(from, to)}
            fill="none"
            stroke={active ? "var(--color-brand)" : "var(--color-border)"}
            strokeWidth={active ? 0.35 : 0.25}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}

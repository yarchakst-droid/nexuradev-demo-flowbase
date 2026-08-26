"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { graphEdges, graphNodes, type GraphNode } from "@/data/graph";

const NODE_COLOR: Record<GraphNode["kind"], string> = {
  trigger: "#c8f34d",
  logic: "#e8e8ec",
  action: "#ff7a54",
};

const NODE_SIZE: Record<GraphNode["kind"], number> = {
  trigger: 0.24,
  logic: 0.19,
  action: 0.24,
};

function hashOffset(key: string): number {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % 997;
  return h / 997;
}

function edgeCurve(from: THREE.Vector3, to: THREE.Vector3, key: string): THREE.QuadraticBezierCurve3 {
  const mid = from.clone().lerp(to, 0.5);
  const bend = 0.4 + hashOffset(key) * 0.5;
  const dir = mid.clone().normalize();
  const control = mid.add(dir.multiplyScalar(bend));
  return new THREE.QuadraticBezierCurve3(from, control, to);
}

function Particle({
  curve,
  color,
  offset,
  speed,
  active,
}: {
  curve: THREE.QuadraticBezierCurve3;
  color: string;
  offset: number;
  speed: number;
  active: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = (state.clock.elapsedTime * speed + offset) % 1;
    const p = curve.getPointAt(t);
    ref.current?.position.set(p.x, p.y, p.z);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[active ? 0.045 : 0.03, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={active ? 1 : 0.55} />
    </mesh>
  );
}

function Edge({
  from,
  to,
  curveKey,
  active,
  dimmed,
}: {
  from: [number, number, number];
  to: [number, number, number];
  curveKey: string;
  active: boolean;
  dimmed: boolean;
}) {
  const curve = useMemo(
    () => edgeCurve(new THREE.Vector3(...from), new THREE.Vector3(...to), curveKey),
    [from, to, curveKey],
  );
  const points = useMemo(() => curve.getPoints(28), [curve]);
  const color = active ? "#c8f34d" : "#5c5c66";

  return (
    <>
      <Line
        points={points}
        color={color}
        lineWidth={active ? 1.6 : 1}
        transparent
        opacity={dimmed ? 0.08 : active ? 0.85 : 0.35}
      />
      <Particle curve={curve} color={active ? "#eaffb0" : "#8a8a94"} offset={hashOffset(curveKey)} speed={active ? 0.55 : 0.22} active={active} />
      <Particle
        curve={curve}
        color={active ? "#eaffb0" : "#8a8a94"}
        offset={(hashOffset(curveKey) + 0.5) % 1}
        speed={active ? 0.55 : 0.22}
        active={active}
      />
    </>
  );
}

function Node({
  node,
  hovered,
  dimmed,
  onHover,
}: {
  node: GraphNode;
  hovered: boolean;
  dimmed: boolean;
  onHover: (id: string | null) => void;
}) {
  const color = NODE_COLOR[node.kind];
  const size = NODE_SIZE[node.kind] * (hovered ? 1.25 : 1);

  return (
    <group position={node.position}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node.id);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(null);
        }}
      >
        <icosahedronGeometry args={[size, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.5 : dimmed ? 0.15 : 0.55}
          roughness={0.4}
          metalness={0.05}
          transparent
          opacity={dimmed ? 0.35 : 1}
        />
      </mesh>
      <mesh scale={2.2}>
        <sphereGeometry args={[size, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={dimmed ? 0.02 : hovered ? 0.14 : 0.06} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.045;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.06;
  });
  return <group ref={group}>{children}</group>;
}

export default function GraphScene() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const nodeById = useMemo(() => new Map(graphNodes.map((n) => [n.id, n])), []);

  const connected = useMemo(() => {
    if (!hoveredId) return null;
    const nodeIds = new Set<string>([hoveredId]);
    const edgeKeys = new Set<string>();
    for (const e of graphEdges) {
      if (e.from === hoveredId || e.to === hoveredId) {
        nodeIds.add(e.from);
        nodeIds.add(e.to);
        edgeKeys.add(`${e.from}->${e.to}`);
      }
    }
    return { nodeIds, edgeKeys };
  }, [hoveredId]);

  return (
    <Canvas
      camera={{ position: [0, 0, 9.5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.8]}
    >
      <color attach="background" args={["#0a0a0c"]} />
      <fog attach="fog" args={["#0a0a0c", 7.5, 15]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 6, 6]} intensity={40} />
      <pointLight position={[-6, -4, -4]} intensity={20} color="#ff7a54" />

      <Rig>
        {graphEdges.map((e) => {
          const from = nodeById.get(e.from)!;
          const to = nodeById.get(e.to)!;
          const key = `${e.from}->${e.to}`;
          const active = connected ? connected.edgeKeys.has(key) : false;
          const dimmed = connected ? !active : false;
          return (
            <Edge key={key} from={from.position} to={to.position} curveKey={key} active={active} dimmed={dimmed} />
          );
        })}

        {graphNodes.map((node) => (
          <Node
            key={node.id}
            node={node}
            hovered={hoveredId === node.id}
            dimmed={connected ? !connected.nodeIds.has(node.id) : false}
            onHover={setHoveredId}
          />
        ))}
      </Rig>
    </Canvas>
  );
}

"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Deterministic PRNG so the constellation is identical on every visit. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PRIMARY = new THREE.Color("#e48768");
const SAGE = new THREE.Color("#6f8a84");
const LINE = new THREE.Color("#8a5f4e");

function buildNetwork(count: number, spread: number, seed: number) {
  const rand = mulberry32(seed);
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    points.push(
      new THREE.Vector3(
        (rand() - 0.5) * spread * 2,
        (rand() - 0.5) * spread,
        (rand() - 0.5) * spread,
      ),
    );
  }
  // Connect each node to its 2 nearest neighbours — reads as a system graph,
  // not random noise.
  const linePositions: number[] = [];
  points.forEach((p, i) => {
    const nearest = points
      .map((q, j) => ({ j, d: i === j ? Infinity : p.distanceTo(q) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    for (const { j } of nearest) {
      linePositions.push(p.x, p.y, p.z, points[j].x, points[j].y, points[j].z);
    }
  });
  return { points, linePositions: new Float32Array(linePositions) };
}

function Network({ dense }: Readonly<{ dense: boolean }>) {
  const group = useRef<THREE.Group>(null);
  const { points, linePositions } = useMemo(
    () => buildNetwork(dense ? 26 : 16, dense ? 5.4 : 6.5, 20260711),
    [dense],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.05;
    // Gentle pointer parallax.
    const tx = state.pointer.y * 0.12;
    const tz = state.pointer.x * 0.1;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, tx, 0.04);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, tz, 0.04);
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={LINE} transparent opacity={0.35} />
      </lineSegments>
      {points.map((p, i) => (
        <mesh key={`${p.x}-${p.y}-${i}`} position={p}>
          <sphereGeometry args={[i % 7 === 0 ? 0.075 : 0.045, 12, 12]} />
          <meshBasicMaterial
            color={i % 7 === 0 ? SAGE : PRIMARY}
            transparent
            opacity={i % 7 === 0 ? 0.9 : 0.75}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * The Dexova "system blueprint" as a floating 3D constellation.
 * `dense` = hero variant; sparse variant is used as ambient texture
 * behind dark sections.
 */
export default function BlueprintScene({ dense = true }: Readonly<{ dense?: boolean }>) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ pointerEvents: "none" }}
      aria-hidden
    >
      <fog attach="fog" args={["#151a22", 6, 12]} />
      <Network dense={dense} />
    </Canvas>
  );
}

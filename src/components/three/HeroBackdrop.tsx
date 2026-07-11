import { DotGridBackdrop } from "@/components/ui/backdrops";
import { Scene3D } from "./Scene3D";

/** Hero 3D layer with static dot-grid fallback. Server-safe wrapper. */
export function HeroBackdrop() {
  return (
    <Scene3D
      dense
      fallback={<DotGridBackdrop />}
      className="[mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]"
    />
  );
}

import type { AutonomyTier } from "./types";

const weight: Record<AutonomyTier, number> = {
  act: 0,
  draft: 1,
  never: 2,
};

export function resolveAutonomy(layers: AutonomyTier[]): AutonomyTier {
  return layers.reduce<AutonomyTier>(
    (strictest, layer) => weight[layer] > weight[strictest] ? layer : strictest,
    "act",
  );
}

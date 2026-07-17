export type AutonomyTier = "act" | "draft" | "never";

export interface OperatingSystem {
  core: {
    system: string;
    governance: string;
  };
  pack: {
    name: string;
    readme: string;
    governance: string;
  };
}

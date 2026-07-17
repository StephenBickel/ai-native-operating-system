import type { NextConfig } from "next";

const config: NextConfig = {
  output: "standalone",
  transpilePackages: [
    "@anos/agent-runtime",
    "@anos/auth",
    "@anos/model-providers",
    "@anos/ui",
    "@anos/workflow-runtime",
  ],
};

export default config;

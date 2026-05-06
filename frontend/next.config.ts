import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  sassOptions: {
    implementation: "sass-embedded",
    loadPaths: [path.join(process.cwd(), "app/styles")],
    additionalData: `@use "tokens" as *;\n`,
  },
};

export default nextConfig;

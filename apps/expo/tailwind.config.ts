import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

import baseConfig from "@1goal/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig, nativewind],
} satisfies Config;

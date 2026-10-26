import type { Services } from "@/lib/services/contract";
import { demoServices } from "@/lib/services/demo";
import { liveServices } from "@/lib/services/live";

const configured = import.meta.env.VITE_DATA_SOURCE as string | undefined;

export const DATA_SOURCE: "demo" | "live" =
  configured === "demo" || configured === "live" ? configured : import.meta.env.DEV ? "demo" : "live";

export const IS_DEMO = DATA_SOURCE === "demo";

export const services: Services = IS_DEMO ? demoServices : liveServices;

export type { Services } from "@/lib/services/contract";
export { BackendNotConnectedError } from "@/lib/services/live";

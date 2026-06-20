import { createOcsm } from "@orhancodestudio/ocsm-core/server";
import ocsmConfig from "@/ocsm.config";

/**
 * The shared OCS Management instance for this app. Server-only — import it from
 * Server Components and Server Actions, never from Client Components.
 */
export const ocsm = createOcsm(ocsmConfig);

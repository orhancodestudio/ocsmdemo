import { handleMediaRequest } from "@orhancodestudio/ocsm-core/server";
import { ocsm } from "@/lib/ocsm";

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ path: string[] }> },
) {
  const { path } = await ctx.params;
  return handleMediaRequest(ocsm, path.join("/"));
}

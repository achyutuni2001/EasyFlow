import { NextResponse } from "next/server";

import { getTenantRiskSignals } from "@/lib/tenant-data";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const snapshot = await getTenantRiskSignals(params.slug);
  return NextResponse.json(snapshot);
}

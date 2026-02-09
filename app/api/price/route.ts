import { NextRequest, NextResponse } from "next/server";
import { getLowestPrice } from "@/app/lib/discogs";

export async function GET(request: NextRequest) {
    const releaseId = request.nextUrl.searchParams.get('id');
    if (!releaseId) {
        return NextResponse.json({ error: "No Release ID Available" }, { status: 400 });
    }
    const price = await getLowestPrice(Number(releaseId));

    return NextResponse.json({ price });
}
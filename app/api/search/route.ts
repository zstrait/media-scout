import { NextRequest, NextResponse } from "next/server";
import { handleDiscogsSearch } from "@/app/lib/discogs";

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('query');
    const pageParam = request.nextUrl.searchParams.get('page') || '1';
    const page = parseInt(pageParam);

    if (!query) {
        return NextResponse.json({ error: "Empty Search Query" }, { status: 400 });
    }
    const results = await handleDiscogsSearch(query, page);

    return NextResponse.json(results, { headers: { 'Cache-Control': 'public, max-age=300' } });
}
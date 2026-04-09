import { NextRequest, NextResponse } from "next/server";
import { handleLastfmSearch } from "@/app/lib/lastfm";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('query');

    if (!query) {
        return NextResponse.json({ error: "Empty Search Query" }, { status: 400 });
    }

    try {
        const results = await handleLastfmSearch(query);
        return NextResponse.json(results);
    } catch (error) {
        console.error("Last.fm search failed:", error);
        return NextResponse.json([]);
    }
}

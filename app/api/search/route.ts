import { NextRequest, NextResponse } from "next/server";
import { handleDiscogsSearch } from "@/app/lib/discogs";

export async function GET(request: NextRequest){
    const query = request.nextUrl.searchParams.get('query');
    if (!query) {
        return NextResponse.json({error: "Empty Search Query"}, {status: 400});
    }
    const results = await handleDiscogsSearch(query);

    return NextResponse.json(results);
}
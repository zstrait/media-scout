import { NextRequest, NextResponse } from "next/server";
import { handleSearch } from "@/app/lib/search";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('query');
    const pageParam = request.nextUrl.searchParams.get('page') || '1';
    const page = parseInt(pageParam);

    if (!query) {
        return NextResponse.json({ error: "Empty Search Query" }, { status: 400 });
    }
    const results = await handleSearch(query, page);

    return NextResponse.json(results);
}
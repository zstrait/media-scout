import { SearchResults } from "./types";
import { handleEbaySearch } from "./ebay";
import { handleDiscogsSearch } from "./discogs";

function interleaveArrays<T>(array1: T[], array2: T[]): T[] {
    const result: T[] = [];
    const maxLength = Math.max(array1.length, array2.length);

    for (let i = 0; i < maxLength; i++) {
        if (i < array1.length) result.push(array1[i]);
        if (i < array2.length) result.push(array2[i]);
    }
    return result;
}

export async function handleSearch(query: string, page: number = 1): Promise<SearchResults> {
    const discogsPromise = handleDiscogsSearch(query, page).catch(err => {
        console.error("Discogs search failed:", err);
        return { listings: [], totalItems: 0 };
    });
    const ebayPromise = handleEbaySearch(query, page).catch(err => {
        console.error("eBay search failed:", err);
        return { listings: [], totalItems: 0 };
    });

    const [discogsResults, ebayResults] = await Promise.all([discogsPromise, ebayPromise]);
    const combinedListings = interleaveArrays(discogsResults.listings, ebayResults.listings);
    const totalItems = discogsResults.totalItems + ebayResults.totalItems;

    const results = { listings: combinedListings, totalItems: totalItems };

    return results;
}



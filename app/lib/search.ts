import { SearchResults, FilterConditions, Listing } from "./types";
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

export function filterResults(results: Listing[], filters: FilterConditions): Listing[] {
    const filteredResults = results.filter(listing => {
        const isNew = (listing.condition?.toLowerCase() === 'new' || listing.condition?.toLowerCase() === 'brand new');
        const condition = isNew ? 'New' : 'Used';

        let format;
        switch (listing.format.toLowerCase()) {
            case 'vinyl':
                format = 'Vinyl';
                break;
            case 'cd':
                format = 'CD';
                break;
            case 'cassette':
                format = 'Cassette';
                break;
            default:
                format = 'Other';
        }

        // price
        if (filters.priceMin && listing.price < filters.priceMin) { return false; }
        if (filters.priceMax && listing.price > filters.priceMax) { return false; }
        // format
        if (filters.format.length > 0 && !filters.format.includes(format)) { return false; }
        // release year
        if (filters.yearMin && Number(listing.year) < filters.yearMin) { return false; }
        if (filters.yearMax && Number(listing.year) > filters.yearMax) { return false; }
        // listing source
        if (filters.platform.length > 0 && !filters.platform.includes(listing.source)) { return false; }
        // condition
        if (filters.condition.length > 0) {
            if (!listing.condition || !filters.condition.includes(condition)) { return false; }
        }

        return true;
    });

    return filteredResults;
}

export function sortResults(results: Listing[], sorting: string): Listing[] {
    const sortedResults = [...results].sort((listing1, listing2) => {
        switch (sorting) {
            case 'Price: Low to High':
                return listing1.price - listing2.price;
            case 'Price: High to Low':
                return listing2.price - listing1.price;
            case 'Best Match':
            default:
                return 0;
        }
    });

    return sortedResults;
}

export function processResults(results: Listing[], filters: FilterConditions): Listing[] {
    const filteredResults = filterResults(results, filters);
    if (filters.sorting === 'Best Match') {
        return filteredResults;
    }
    const sortedResults = sortResults(filteredResults, filters.sorting);

    return sortedResults;
}

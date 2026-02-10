import { Listing } from './types'

const DISCOGS_HEADERS = {
    'User-Agent': 'MediaScout/1.0',
    'Authorization': `Discogs token=${process.env.DISCOGS_TOKEN}`
};

interface DiscogsItem {
    id: number,
    title: string,
    format: string | string[],
    year: string,
    thumb: string,
    uri: string,
    resource_url: string
}

interface DiscogsResponse {
    pagination: { items: number },
    results: DiscogsItem[]
}

interface SearchResults {
    listings: Listing[],
    totalItems: number
}

interface ReleaseStatistics {
    lowest_price: { currency: string, value: number },
    num_for_sale: number
}

export async function getDiscogsResults(query: string, page: number = 1): Promise<DiscogsResponse> {
    const baseURL = 'https://api.discogs.com/database/search';
    const params = new URLSearchParams({
        q: query,
        type: "release",
        page: page.toString(),
        per_page: "10"
    });

    const response = await fetch(`${baseURL}?${params.toString()}`, {
        headers: DISCOGS_HEADERS
    });
    if (!response.ok) {
        throw new Error("Error fetching Discogs Response Data");
    }
    const data = await response.json() as DiscogsResponse;

    return data;
}

export function mapListingData(item: DiscogsItem): Listing {
    const nameData = item.title.split('-');
    const title = nameData.length > 1 ? nameData[1] : item.title;
    const artist = nameData.length > 1 ? nameData[0] : 'Unknown Artist';
    const listingsURL = `https://www.discogs.com/sell/release/${item.id}`;

    return {
        id: item.id,
        cover: item.thumb,
        title: title,
        artist: artist,
        year: item.year,
        format: item.format[0],
        condition: 'Unknown',
        price: 0,
        source: 'Discogs',
        sourceLink: listingsURL,
    }
}

export async function handleDiscogsSearch(query: string, page: number = 1): Promise<SearchResults> {
    const releases = await getDiscogsResults(query, page);
    const totalItems = releases.pagination.items;

    const listingPromises = releases.results.map(async (item) => {
        const listing = mapListingData(item);
        // const price = await getLowestPrice(item.id);
        
        // listing.price = price || 0; 
        
        return listing;
    });
    const listings = await Promise.all(listingPromises);

    // filter out listings w/o price available 
    // const validListings = listings.filter(item => item.price > 0);

    return { listings, totalItems };
}

export async function getReleaseStats(id: number): Promise<ReleaseStatistics> {
    const releaseId = id.toString();
    const url = `https://api.discogs.com/marketplace/stats/${releaseId}?curr_abbr=USD`;

    const response = await fetch(url, {headers: DISCOGS_HEADERS});
    if (!response.ok) {
        console.error(`Discogs API Error: ${response.status} ${response.statusText}`);
        throw new Error(`Discogs Error: ${response.status}`);
    }

    const stats = await response.json() as ReleaseStatistics;

    return stats;
}

export async function getLowestPrice(id: number): Promise<number | null> {
    try {
        const stats = await getReleaseStats(id);
        return stats.lowest_price ? stats.lowest_price.value : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}


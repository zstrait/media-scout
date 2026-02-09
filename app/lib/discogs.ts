import { Listing } from './types'

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

export async function getDiscogsResults(query: string): Promise<DiscogsResponse> {
    const token = process.env.DISCOGS_TOKEN;
    if (!token) {
        throw new Error("Missing DISCOGS_TOKEN");
    }

    const baseURL = 'https://api.discogs.com/database/search';
    const params = new URLSearchParams({
        q: query,
        type: "release",
        token: token
    });

    const response = await fetch(`${baseURL}?${params.toString()}`);
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

export async function handleDiscogsSearch(query: string): Promise<SearchResults> {
    const releases = await getDiscogsResults(query);
    const totalItems = releases.pagination.items;

    const listings = releases.results.map((item: DiscogsItem) => {
        return mapListingData(item);
    });

    return { listings, totalItems };
}

export async function getReleaseStats(id: number): Promise<ReleaseStatistics> {
    const releaseId = id.toString();
    const url = `https://api.discogs.com/marketplace/stats/${releaseId}?curr_abbr=USD`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error Fetching Release Stats");
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


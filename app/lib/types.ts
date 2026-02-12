
export interface Listing {
    id: number | string,
    cover?: string,
    title: string,
    artist: string,
    year?: string,
    format: string,
    condition?: string,
    price: number,
    source: 'Discogs' | 'eBay',
    sourceLink: string,
    postedDate?: string,
    // isHearted: boolean
}

export interface SearchResults {
    listings: Listing[],
    totalItems: number
}

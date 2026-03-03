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
    isHearted?: boolean
}

export interface SearchResults {
    listings: Listing[],
    totalItems: number
}

export interface FilterConditions {
    sorting: string,
    priceMin?: number,
    priceMax?: number,
    format: string[],
    yearMin?: number,
    yearMax?: number
    platform: string[],
    condition: string[]
}

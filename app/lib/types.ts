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

export interface SearchSuggestion {
    album: string,
    artist: string,
    cover?: string,
}

export interface FilterConditions {
    sorting: string,
    priceMin?: number,
    priceMax?: number,
    artist?: string,
    format: string[],
    yearMin?: number,
    yearMax?: number
    platform: string[],
    condition: string[]
}


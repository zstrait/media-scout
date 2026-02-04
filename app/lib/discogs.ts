  
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
    results: DiscogsItem[]
}


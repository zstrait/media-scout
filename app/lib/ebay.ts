import { Listing } from "./types";
 
interface ebayItem {
    condition: string,
    image: { height: number, imageUrl: string, width: number },
    itemCreationDate: string,
    itemId: string,
    itemHref: string,
    itemWebUrl: string,
    price: { value: string },
    title: string
}

interface ebayResponse {
    itemSummaries: ebayItem[]
}

export async function getEbayResults(query: string, page: number = 1): Promise<ebayResponse> {
    const baseURL = 'https://api.ebay.com/buy/browse/v1/item_summary/search?';
    const offset = page > 1 ? (page * 10) - 10 : 0;
    const params = new URLSearchParams({
        q: query,
        limit: '10',
        offset: offset.toString(),
    });

    const response = await fetch(`${baseURL}${params.toString()}`);
    if(!response.ok) {
        throw new Error ('Error Fetching eBay Results');
    }
    const data = await response.json() as ebayResponse;

    return data;
}

import { Listing, SearchResults } from "./types";

interface ebayItem {
    title: string,
    image: { height: number, imageUrl: string, width: number },
    itemCreationDate: string,
    itemId: string,
    itemHref: string,
    itemWebUrl: string,
    price: { value: string },
    categories: { categoryName: string }[]
}

interface ebayResponse {
    itemSummaries: ebayItem[]
}

interface ebayItemDetails {
    condition: string,
    localizedAspects: localizedAspect[]
}

interface localizedAspect {
    name: string,
    value: string
}

let cachedToken: string | null = null;
let tokenExpiration: number = 0;

// needed for ebay's oauth requirements
async function getAccessToken(): Promise<string> {
    const now = Date.now();
    if (cachedToken && now < tokenExpiration - 10000) {
        return cachedToken;
    }

    const clientId = process.env.EBAY_APP_ID;
    const clientSecret = process.env.EBAY_CERT_ID;

    if (!clientId || !clientSecret) {
        throw new Error("Missing eBay credentials in environment variables");
    }

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${credentials}`
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            scope: 'https://api.ebay.com/oauth/api_scope'
        }).toString()
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch eBay token: ${response.status}`);
    }
    const data = await response.json();

    cachedToken = data.access_token;
    tokenExpiration = now + (data.expires_in * 1000);

    return data.access_token;
}


export async function getEbayResults(query: string, page: number = 1): Promise<ebayResponse> {
    const baseURL = 'https://api.ebay.com/buy/browse/v1/item_summary/search?';
    const offset = page > 1 ? (page * 10) - 10 : 0;
    const params = new URLSearchParams({
        q: query,
        category_ids: '11233',
        limit: '10',
        offset: offset.toString(),
    });

    const token = await getAccessToken();
    const response = await fetch(`${baseURL}${params.toString()}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`Error Fetching eBay Results: ${response.status}`);
    }
    const data = await response.json() as ebayResponse;

    return data;
}

export async function getItemDetails(item_id: string): Promise<ebayItemDetails> {
    const baseURL = 'https://api.ebay.com/buy/browse/v1/item/'
    const url = `${baseURL}${item_id}?fieldgroups=PRODUCT`;

    const token = await getAccessToken();
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`Error Fetching Item Details: ${response.status}`);
    }

    const data = await response.json() as ebayItemDetails;

    return data;
}

export function getDetail(detailName: string, itemDetails: ebayItemDetails): string {
    const detailElement = itemDetails.localizedAspects.find((element) => element.name === `${detailName}`);
    const detail = detailElement?.value ?? 'N/A';

    return detail;
}

export function mapEbayListingData(item: ebayItem, itemDetails: ebayItemDetails): Listing {
    const releaseTitle = getDetail('Release Title', itemDetails);
    const title = (releaseTitle === 'N/A') ? item.title : releaseTitle;
    const artist = getDetail('Artist', itemDetails);
    const year = getDetail('Release Year', itemDetails);
    const format = getDetail('Format', itemDetails);

    return {
        id: item.itemId,
        cover: item.image.imageUrl,
        title: title,
        artist: artist,
        year: year,
        format: format,
        condition: itemDetails.condition,
        price: Number(item.price.value),
        source: 'eBay',
        sourceLink: item.itemWebUrl,
        postedDate: item.itemCreationDate
    }
}

export async function handleEbaySearch(query: string, page: number = 1): Promise<SearchResults> {
    const response = await getEbayResults(query, page);
    const totalItems = response.itemSummaries.length;

    const listingPromises = response.itemSummaries.map(async (item) => {
        const itemDetails = await getItemDetails(item.itemId);
        const listing = mapEbayListingData(item, itemDetails);

        return listing;
    })
    const listings = await Promise.all(listingPromises);

    return { listings: listings, totalItems };
}


// used for testing, not part of actual dataflow
export async function getEbayItem(itemId: string): Promise<ebayItem> {
    const baseURL = 'https://api.ebay.com/buy/browse/v1/item/'
    const url = `${baseURL}${itemId}`;

    const token = await getAccessToken();
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`Error Fetching Item Details: ${response.status}`);
    }

    const data = await response.json() as ebayItem;

    return data;
}
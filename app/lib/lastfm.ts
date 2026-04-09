import { SearchSuggestion } from "./types";

interface lastfmImage {
    '#text': string,
    size: 'small' | 'medium' | 'large' | 'extralarge'
}

interface lastfmAlbum {
    name: string,
    artist: string,
    image: lastfmImage[],

}

interface lastfmResponse {
    results: { albummatches: { album: lastfmAlbum[] } }
}

async function getLastfmResults(query: string, limit: string = '5'): Promise<lastfmResponse> {
    const api_key = process.env.LASTFM_API_KEY;
    if (!api_key) {
        throw new Error('LASTFM_API_KEY is not configured');
    }

    const baseURL=`http://ws.audioscrobbler.com/2.0/?method=album.search`;
    const params = new URLSearchParams({
        album: query,
        api_key: api_key,
        format: 'json',
        limit: limit
    })

    const response = await fetch(`${baseURL}&${params.toString()}`, {
        cache: 'no-store' 
    });
    if (!response.ok) {
        throw new Error(`Error fetching Last.fm data: ${response.status}`);
    }
    const data = await response.json() as lastfmResponse;

    return data
}

function mapLastfmAlbum(album: lastfmAlbum): SearchSuggestion {
    const mediumImage = album.image[1]['#text'];

    return {
        album: album.name,
        artist: album.artist,
        cover: mediumImage || undefined,
    }
}

export async function handleLastfmSearch(query: string): Promise<SearchSuggestion[]>{
    const response = await getLastfmResults(query);
    const albums = response.results.albummatches.album;

    const searchSuggestionPromises = albums.map(async (item) => {
        const album = mapLastfmAlbum(item);
        return album;
    });
    const suggestions = await Promise.all(searchSuggestionPromises);

    return suggestions;
}
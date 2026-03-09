'use client'

import {useLocalStorage} from '@mantine/hooks'
import { Listing } from './types'

export function useWatchlist() {
    const [favorites, setFavorites] = useLocalStorage<Listing[]>({
        key: 'mediaScoutFavorites',
        defaultValue: [],
        getInitialValueInEffect: true
    });

    const toggleFavorite = (listing: Listing) => {
        setFavorites((currentFavorites) => {
            const exists = currentFavorites.some(item => item.id === listing.id);
            
            const favorites = exists 
            ? currentFavorites.filter(item => item.id !== listing.id)
            : [...currentFavorites, listing];

            return favorites;
        });
    }

    const isFavorite = (id: string | number) => {
        return favorites.some(item => item.id === id);
    }

    return {favorites, toggleFavorite, isFavorite}
}


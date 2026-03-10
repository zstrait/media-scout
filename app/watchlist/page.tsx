'use client'

import { useRef, useState, useMemo } from "react"
import { useWatchlist } from "../lib/useWatchlist"

import { Divider } from '@mantine/core'

import SearchHeader from "../ui/SearchHeader"
import ListingCard from "../ui/search/ListingCard"
import FilterMenu from "../ui/FilterMenu"
import EmptyWatchlist from "../ui/watchlist/EmptyWatchlist"
import { FilterConditions } from '../lib/types'
import { applyFiltersAndSorting } from "../lib/utils"

export default function Page() {
    const { favorites } = useWatchlist();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [activeFilters, setActiveFilters] = useState<FilterConditions>({
        sorting: 'Best Match',
        priceMin: undefined,
        priceMax: undefined,
        format: [],
        platform: [],
        condition: []
    });

    const listings = useMemo(() => {
        return applyFiltersAndSorting(favorites, activeFilters);
    }, [activeFilters, favorites]);

    const leftColumnListings = listings.filter((_, index) => index % 2 === 0);
    const rightColumnListings = listings.filter((_, index) => index % 2 === 1);

    return (
        <div className='flex flex-col align-center bg-[#1E1E1E] text-gray-200 h-screen justify-between py-4 pr-4 pb-0 font-mono'>

            <SearchHeader />
            <Divider my="sm" />

            <div ref={scrollContainerRef} className="flex flex-col h-full overflow-scroll pr-3">
                <div className="flex" style={{ minHeight: 'auto' }}>
                    <div className={`sticky top-0 self-start flex flex-col pt-1 ${isSidebarOpen ? '' : 'translate-x-[-180px]  mr-[-180px]'} transition-all duration-300 ease-in-out`}>
                        <FilterMenu filters={activeFilters} onFilterChange={setActiveFilters} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                    </div>

                    {(favorites.length === 0)
                        ? < EmptyWatchlist />
                        : (
                            <div className="flex flex-col justify-start gap-4 pl-5 pt-1 w-full ">
                                <span className="underline underline-offset-6 pl-3 font-bold text-2xl self-start opacity-80">
                                    Watchlist
                                </span>

                                <div className='flex justify-between gap-5 w-full pb-4'>
                                    <div className="flex flex-col gap-6 w-full items-end">
                                        {leftColumnListings.map((listing) => (
                                            <ListingCard key={listing.id} listing={listing} isSidebarOpen={isSidebarOpen} />
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-6 w-full items-end">
                                        {rightColumnListings.map((listing) => (
                                            <ListingCard key={listing.id} listing={listing} isSidebarOpen={isSidebarOpen} slideDirection="left" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
'use client'

import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, useRouter } from "next/navigation";
import { Pagination, Divider } from '@mantine/core';

import { Listing, FilterConditions } from "../lib/types";
import ListingCard from "../ui/search/ListingCard";
import SearchHeader from '../ui/search/SearchHeader';
import ListingCardSkeleton from '../ui/search/ListingCardSkeleton';
import SearchMenu from '../ui/search/SearchMenu';

import { processResults } from '../lib/search';

export default function Page() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    const router = useRouter();
    const page = Number(searchParams.get('page')) || 1;

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [minHeight, setMinHeight] = useState<number | undefined>(undefined);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const [activeFilters, setActiveFilters] = useState<FilterConditions>({
        sorting: 'Best Match',
        priceMin: undefined,
        priceMax: undefined,
        format: [],
        platform: [],
        condition: []
    });

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `/search?${params.toString()}`;
    };

    useEffect(() => {
        if (!query) return;

        if (scrollContainerRef.current) {
            const currentHeight = scrollContainerRef.current.scrollHeight;
            setMinHeight(currentHeight);
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/search?query=${query}&page=${page}`);
                if (!res.ok) throw new Error('Failed to fetch data.')

                const results = await res.json();
                setListings(results.listings);
                setTotalItems(results.totalItems);
            } catch (error) {
                console.error('Failed to get search results:', error);
            } finally {
                setIsLoading(false);
                setMinHeight(undefined);
            }
        };
        fetchData();

    }, [query, page]);

    const displayedListings = useMemo(() => {
        return processResults(listings, activeFilters);
    }, [activeFilters, listings]);

    const leftColumnListings = displayedListings.filter((_, index) => index % 2 === 0);
    const rightColumnListings = displayedListings.filter((_, index) => index % 2 === 1);
    const skeletons = Array(20).fill(0).map((_, i) => (<ListingCardSkeleton key={i} isSidebarOpen={isSidebarOpen}/>));
    const totalPages = Math.ceil(totalItems / 20);

    return (
        <div className='flex flex-col align-center bg-[#1E1E1E] text-gray-200 h-screen justify-between py-4 pr-4 pb-0 font-mono'>

            <SearchHeader />
            <Divider my="sm" variant="dashed" />

            <div ref={scrollContainerRef} className="flex flex-col h-full overflow-scroll pr-3">
                <div
                    className="flex"
                    style={{ minHeight: minHeight ? `${minHeight}px` : 'auto' }}
                >
                    <div className={`sticky top-0 self-start flex flex-col pt-1 ${isSidebarOpen ? '' : 'translate-x-[-180px]  mr-[-180px]'} transition-all duration-300 ease-in-out`}>
                        <SearchMenu filters={activeFilters} onFilterChange={setActiveFilters} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                    </div>

                    {/* Listings */}
                    <div className="flex flex-col justify-between gap-4 pl-5 pt-1 w-full">
                        <span className="underline underline-offset-6 pl-3 font-bold text-2xl self-start opacity-80">
                            {totalItems.toLocaleString('en-us')} Results
                        </span>

                        <div className='flex justify-between gap-5 w-full'>
                            <div className="flex flex-col gap-6 w-full items-end">
                                {isLoading
                                    ? skeletons.slice(0, 10)
                                    : leftColumnListings.map((listing) => (
                                        <ListingCard key={listing.id} listing={listing} isSidebarOpen={isSidebarOpen} />
                                    ))
                                }
                            </div>
                            <div className="flex flex-col gap-6 w-full items-end">
                                {isLoading
                                    ? skeletons.slice(10, 20)
                                    : rightColumnListings.map((listing) => (
                                        <ListingCard key={listing.id} listing={listing} isSidebarOpen={isSidebarOpen} slideDirection="left" />
                                    ))
                                }
                            </div>
                        </div>
                        {/* Pagination Controls */}
                        <div className="flex justify-center items-center py-8">
                            <Pagination
                                total={totalPages}
                                value={page}
                                siblings={1}
                                onChange={(newPage) => {
                                    router.push(createPageURL(newPage));
                                }}
                                color="gray"
                                size="lg"
                            />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}
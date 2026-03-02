'use client'

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from "next/navigation";
import { Pagination, Divider } from '@mantine/core';

import { Listing } from "../lib/types";
import ListingCard from "../ui/search/ListingCard";
import SearchHeader from '../ui/search/SearchHeader';
import ListingCardSkeleton from '../ui/search/ListingCardSkeleton';
import SearchMenu from '../ui/search/SearchMenu';

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

    const leftColumnListings = listings.filter((_, index) => index % 2 === 0);
    const rightColumnListings = listings.filter((_, index) => index % 2 === 1);
    const skeletons = Array(20).fill(0).map((_, i) => (<ListingCardSkeleton key={i} />));
    const totalPages = Math.ceil(totalItems / 20);

    return (
        <div className='flex flex-col align-center bg-[#1E1E1E] text-gray-200 h-screen justify-between py-4 pr-4 pb-0 font-mono'>

            <SearchHeader />
            <Divider my="sm" variant="dashed" />

            <div ref={scrollContainerRef} className="flex flex-col h-full overflow-scroll px-3">
                <div
                    className="flex flex-col"
                    style={{ minHeight: minHeight ? `${minHeight}px` : 'auto' }}
                >

                    {/* Listings */}
                    <div className="flex justify-end gap-6 pl-1">
                        <div className="sticky top-0 pt-2 self-start flex flex-col items-center">
                            <span className="underline underline-offset-6 font-bold pt-1 text-2xl pb-2">
                                {totalItems.toLocaleString('en-us')} Results
                            </span>
                            <SearchMenu />
                        </div>

                        <div className="flex flex-col gap-6 pt-4">
                            {isLoading
                                ? skeletons.slice(0, 10)
                                : leftColumnListings.map((listing) => (
                                    <ListingCard key={listing.id} listing={listing} />
                                ))
                            }
                        </div>
                        <div className="flex flex-col gap-6 pt-4">
                            {isLoading
                                ? skeletons.slice(10, 20)
                                : rightColumnListings.map((listing) => (
                                    <ListingCard key={listing.id} listing={listing} slideDirection="left" />
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
    );
}
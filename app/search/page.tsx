'use client'

import ListingCard from "../ui/search/ListingCard";
import SearchBar from "../ui/SearchBar";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from "next/navigation";
import { Listing } from "../lib/types";



export default function Page() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    const router = useRouter();
    const page = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `/search?${params.toString()}`;
    };

    useEffect(() => {
        if (!query) {
            return
        };

        const fetchData = async () => {
            try {
                const res = await fetch(`/api/search?query=${query}&page=${page}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch data.')
                }

                const results = await res.json();
                setListings(results.listings);
                setTotalItems(results.totalItems);

            } catch (error) {
                console.error('Failed to get search results:', error);
            }
        };
        fetchData();

    }, [query, page]);

    const leftColumnListings = listings.filter((_, index) => index % 2 === 0);
    const rightColumnListings = listings.filter((_, index) => index % 2 === 1);

    return (
        <>
            <div className='flex flex-col align-center bg-[#1E1E1E] text-gray-200 h-screen justify-between p-4 pb-0 font-mono'>
                <div className="flex flex-col gap-6">
                    <header className='flex justify-between items-center'>
                        <Link href='/'>Home</Link>
                        <SearchBar placeholder='Search...' />
                        <div className='flex justify-center gap-8 '>
                            <button className="btn-1">darkmode</button>
                            <button className="btn-1">account</button>
                        </div>
                    </header>

                    <div className="flex justify-between border-t border-dashed p-6">
                        <span className="underline underline-offset-6 font-bold text-2xl">{totalItems.toLocaleString('en-us')} Results</span>
                        <div className="flex justify-center items-center gap-8 ">
                            <button className="btn-1">filter</button>
                            <button className="btn-1">sort</button>
                        </div>
                    </div>
                </div>

                <div className="flex h-full overflow-scroll justify-between px-3">
                    <div className="flex flex-col gap-8">
                        {leftColumnListings.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                    <div className="flex flex-col gap-8">
                        {rightColumnListings.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} slideDirection="left" />
                        ))}
                    </div>
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-center items-center gap-4 py-4 pb-4">
                    <button
                        disabled={page === 1}
                        onClick={() => router.push(createPageURL(page - 1))}
                        className="px-4 py-2 bg-gray-700 rounded-2xl disabled:opacity-50 hover:bg-gray-600 transition-colors b"
                    >
                        Prev
                    </button>

                    <span className="font-bold">Page {page}</span>

                    <button
                        onClick={() => router.push(createPageURL(page + 1))}
                        className="px-4 py-2 bg-gray-700 rounded-2xl hover:bg-gray-600 transition-colors"
                    >
                        Next
                    </button>
                </div>

            </div>
        </>
    );
}
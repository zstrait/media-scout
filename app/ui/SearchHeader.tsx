'use client'

import Link from "next/link"
import { useSearchParams } from "next/navigation";

import { Suspense } from "react";
import { House, Bookmark } from 'lucide-react';

import SearchBar from "./SearchBar";

import { ActionIcon } from "@mantine/core";

export default function SearchHeader() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';


    return (
        <>
            <header className='flex justify-between items-center pb-1 px-5'>
                <ActionIcon
                    component={Link}
                    href="/"
                    variant="transparent"
                    color="gray"
                    size="xl"
                    aria-label="View Watchlist"
                >
                    <House size={36} opacity={0.8} />
                </ActionIcon>

                <Suspense fallback={<div className="h-14 w-xl bg-gray-300 rounded-2xl animate-pulse" />}>
                    <SearchBar key={query} placeholder='Search for an album...' width='w-2xl' />
                </Suspense>

                <ActionIcon
                    component={Link}
                    href="/watchlist"
                    variant="transparent"
                    color="gray"
                    size="xl"
                    aria-label="View Watchlist"
                >
                    <Bookmark size={36} opacity={0.8} strokeWidth={2.3} />
                </ActionIcon>
            </header>
        </>
    )
}
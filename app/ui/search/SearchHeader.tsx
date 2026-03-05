'use client'

import Link from "next/link"
import { useSearchParams } from "next/navigation";

import { Suspense } from "react";
import { Avatar } from '@mantine/core';
import { House, Moon, CircleUserRound } from 'lucide-react';
import SearchBar from "../SearchBar";

export default function SearchHeader() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';


    return (
        <>
            <header className='flex justify-between items-center pb-1 px-2 pl-4'>
                <div className='flex justify-center gap-6 items-center pl-2'>
                    <Link href='/'>
                        <House size={34} opacity={0.8} />
                    </Link>
                </div>

                <Suspense fallback={<div className="h-14 w-xl bg-gray-300 rounded-2xl animate-pulse" />}>
                    <SearchBar key={query} placeholder='Search for an album...' width='w-2xl' />
                </Suspense>

                <div className='flex justify-center gap-6 items-center'>
                    <Moon size={36} opacity={0.8}/>
                    <Avatar size={42}>
                        <CircleUserRound size={42} strokeWidth={1.5} opacity={0.8}/>
                    </Avatar>
                </div>
            </header>
        </>
    )
}
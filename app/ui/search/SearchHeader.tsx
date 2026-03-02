'use client'

import Link from "next/link"
import { Avatar } from '@mantine/core';
import { House, Moon } from 'lucide-react';

import SearchBar from "../SearchBar";


export default function SearchHeader() {

    return (
        <>
            <header className='flex justify-between items-center pb-1 px-2 pl-4'>
                <div className='flex justify-center gap-6 items-center'>
                    <Link href='/'>
                        <House size={34} />
                    </Link>
                </div>
                <SearchBar placeholder='Search...' />
                <div className='flex justify-center gap-6 items-center'>
                    <Moon size={36} />
                    <Avatar size="lg" />
                </div>
            </header>
        </>
    )
}
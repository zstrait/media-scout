'use client'

import Link from "next/link"
import { Avatar, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { House, Moon } from 'lucide-react';

import SearchBar from "../SearchBar";


export default function SearchHeader() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <>
            <header className='flex justify-between items-center pb-1 px-2'>
                <div className='flex justify-center gap-6 items-center'>
                    <Link href='/'>
                        <House size={34} />
                    </Link>
                    <Burger size='lg' opened={opened} onClick={toggle} aria-label="Toggle navigation" />
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
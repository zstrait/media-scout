'use client'

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Listing } from '../../lib/types';

import { HoverCard, ActionIcon, Text } from '@mantine/core';
import { Info, Heart } from 'lucide-react';

import SlideMenu from './SlideMenu';
import { useWatchlist } from '@/app/lib/useWatchlist';

interface ListingCardProps {
    listing: Listing,
    slideDirection?: 'left' | 'right';
    isSidebarOpen: boolean
}

export default function ListingCard({ listing, slideDirection = 'right', isSidebarOpen }: ListingCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [zIndex, setZIndex] = useState('z-auto');
    const wrapperRef = useRef<HTMLDivElement>(null);

    const { isFavorite, toggleFavorite } = useWatchlist();
    const [popping, setPopping] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            setZIndex('z-auto');
        }, 300);
    };

    const handleToggle = () => {
        if (isOpen) {
            handleClose();
        } else {
            setZIndex('z-50');
            setIsOpen(true);
        }
    };

    const handleHeartToggle = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (!isFavorite(listing.id)) {
            setPopping(true);
            setTimeout(() => setPopping(false), 300);
        }
        toggleFavorite(listing);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                handleClose();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    return (
        <div
            ref={wrapperRef}
            className={`relative w-full ${zIndex}`}
        >
            <div
                onClick={handleToggle}
                className={`${isSidebarOpen ? 'w-[590px]' : 'w-[680px]'} h-[195px] relative z-20 bg-[#343333] flex border border-[#3d3d3d] items-stretch p-4 gap-6 justify-between rounded-3xl cursor-pointer hover:border-[#494949] hover:scale-[1.005] hover:shadow-md transition-all duration-300 ease-out"`}
            >
                {listing.cover ? (
                    <Image
                        src={listing.cover}
                        width={100}
                        height={100}
                        className="w-40 h-40 rounded-2xl object-cover shadow-[0_8px_30px_rgb(0,0,0,0.3)] shrink-0"
                        alt={listing.title}
                    />
                ) : (
                    <div className="border w-40 h-40 rounded-3xl bg-gray-500 text-center flex items-center justify-center">
                        Album Art <br></br> Not Available
                    </div>
                )}

                {/* Card Details */}
                <div className={`${isSidebarOpen ? 'w-[372px]' : 'w-[470px]'} flex flex-col justify-between py-1 transition-all duration-300 ease-in-out`}>
                    <div className='flex flex-col gap-0'>
                        <div className="flex flex-1 justify-between min-w-0 items-center pr-1">
                            <span className="text-[20px] w-[300px] font-semibold min-w-0 truncate">{listing.title}</span>
                            <ActionIcon onClick={(e) => handleHeartToggle(e)} className={popping ? 'animate-heart-pop' : ''} variant='transparent' color='gray' size='lg'>
                                {isFavorite(listing.id) ? (
                                    <Heart size={36} strokeWidth={1.5} color="#b52446" fill="#D92C54" />
                                ) : (
                                    <Heart size={36} strokeWidth={1.7} />
                                )}
                            </ActionIcon>
                        </div>

                        <div className="flex gap-2 text-[17px] w-[320] whitespace-nowrap">
                            <span className='truncate'>{listing.artist}</span>
                            <span>•</span>
                            <span>{listing.year}</span>
                        </div>
                    </div>

                    <span
                        className={`text-3xl text-lime-600 font-semibold self-end ${isSidebarOpen ? 'pr-12' : 'pr-21'} transition-all duration-300 ease-in-out`}
                        style={{ textShadow: '0 0 18px rgba(74, 222, 128, 0.1), 0 0 40px rgba(74, 222, 128, 0.25)' }}
                    >
                        ${listing.price.toFixed(2)}
                    </span>

                    <div className="w-full flex justify-between items-end pr-1">
                        <div className="flex gap-2 items-center pb-0.5">
                            <span className='bg-[#44444E] px-2 rounded-xl shadow-md border border-[#39394195]'>{listing.format}</span>
                            <span className='bg-[#44444E] px-2 rounded-xl shadow-md border border-[#39394195]'>{listing.condition}</span>
                        </div>

                        <HoverCard radius='md' width={listing.source === 'Discogs' ? 170 : 180} position="bottom" offset={2} withArrow arrowSize={14} shadow="lg">
                            <HoverCard.Target>
                                <ActionIcon variant='transparent' color='gray' size='lg' mt={12} className='self-end'>
                                    <Info size={30} strokeWidth={1.5} />
                                </ActionIcon>
                            </HoverCard.Target>
                            <HoverCard.Dropdown bg='#2a2a2a' py='6' pl='15' style={{ border: '1px solid #444', borderRadius: '10px' }}>
                                {listing.source === 'Discogs' ? (
                                    <Text size="lg"><b>Source:</b> {listing.source}</Text>
                                ) : (
                                    <>
                                        <Text size="lg"><b>Source:</b> {listing.source}</Text>
                                        <Text size="lg"><b>Posted:</b> {listing.postedDate}</Text>
                                    </>
                                )}
                            </HoverCard.Dropdown>
                        </HoverCard>
                    </div>
                </div >
            </div >

            <SlideMenu
                isRight={slideDirection === 'right'} isOpen={isOpen} setIsOpen={setIsOpen}
                source={listing.source} sourceLink={listing.sourceLink}
            />

        </div >
    )
}
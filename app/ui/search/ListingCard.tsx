'use client'

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Listing } from '../../lib/types';

import { HoverCard, ActionIcon, Text } from '@mantine/core';
import { Info, Heart } from 'lucide-react';

interface ListingCardProps {
    listing: Listing,
    slideDirection?: 'left' | 'right';
}

export default function ListingCard({ listing, slideDirection = 'right' }: ListingCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [zIndex, setZIndex] = useState('z-auto');
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [isHearted, setIsHearted] = useState(listing.isHearted ? listing.isHearted : false);
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
        if (!isHearted) {
            setPopping(true);
            setTimeout(() => setPopping(false), 300);
        }
        setIsHearted(!isHearted);
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

    const isRight = slideDirection === 'right';
    const menuPositionClass = isRight ? 'right-0 rounded-r-3xl rounded-l-md border-l-0 pl-[28px]' : 'left-0 rounded-l-3xl rounded-r-md border-r-0 pr-[28px]';
    const translateClass = isRight
        ? (isOpen ? 'translate-x-[275px]' : 'translate-x-0')
        : (isOpen ? '-translate-x-[275px]' : 'translate-x-0');

    return (
        <div
            ref={wrapperRef}
            className={`relative w-full ${zIndex}`}
        >
            <div
                onClick={handleToggle}
                className="w-[590px] h-[195px] relative z-20 bg-[#343333] flex border border-[#3d3d3d] items-stretch p-4 gap-6 justify-between rounded-3xl cursor-pointer hover:border-[#494949] hover:scale-[1.005] hover:shadow-md transition-all duration-300 ease-out"
            >
                {listing.cover ? (
                    <Image
                        src={listing.cover}
                        width={100}
                        height={100}
                        className="w-40 h-40 rounded-2xl object-cover shadow-[0_8px_30px_rgb(0,0,0,0.3)]"
                        alt={listing.title}
                    />
                ) : (
                    <div className="border w-40 h-40 rounded-3xl bg-gray-500 text-center flex items-center justify-center">
                        Album Art <br></br> Not Available
                    </div>
                )}

                {/* Card Details */}
                <div className='flex flex-col w-[372px] justify-between py-1'>
                    {/* Title, Artist & Year, Heart button */}
                    <div className='flex flex-col gap-0'>
                        <div className="flex flex-1 justify-between min-w-0 items-center pr-1">
                            <span className="text-[20px] w-[300px] font-semibold min-w-0 truncate">{listing.title}</span>
                            <ActionIcon onClick={(e) => handleHeartToggle(e)} className={popping ? 'animate-heart-pop' : ''} variant='transparent' color='gray' size='lg'>
                                {isHearted ? (
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

                    {/* Price */}
                    <span className="text-3xl text-lime-600 font-semibold self-start pl-54" style={{ textShadow: '0 0 18px rgba(74, 222, 128, 0.1), 0 0 40px rgba(74, 222, 128, 0.3)' }}>
                        ${listing.price.toFixed(2)}
                    </span>

                    {/* Format, Condition, Info */}
                    <div className="w-full flex justify-between items-end pr-1">
                        <div className="flex gap-2 items-center pb-1">
                            <span>{listing.format}</span>
                            <span className='bg-[#44444E] px-2 rounded-xl shadow-md'>{listing.condition}</span>
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
                </div>

            </div>

            {/* Slide menu */}
            <div
                className={`absolute top-0 h-full bg-[#3a424b] border-gray-600/80 flex flex-col justify-center items-center gap-6 z-10 transition-all duration-300 ease-in-out border shadow-xl overflow-hidden
                    ${menuPositionClass}
                    ${isOpen ? `w-[300px] ${translateClass}` : `w-[300px] translate-x-0 opacity-0 pointer-events-none`}
                `}
            >
                <span className="text-2xl text-gray font-semibold px-4 text-center">Open Original Listing?</span>
                <div className="flex gap-4">
                    <a href={listing.sourceLink} target="_blank" className="border-2 border-gray text-gray text-xl px-8 py-2 rounded-xl hover:bg-black/10 transition-colors font-bold">Yes</a>
                    <button onClick={() => setIsOpen(false)} className="border-2 border-gray text-gray text-xl px-8 py-2 rounded-xl hover:bg-black/10 transition-colors font-bold">No</button>
                </div>
            </div>
        </div>
    )
}

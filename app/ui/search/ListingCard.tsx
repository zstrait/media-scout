'use client'
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Listing } from '../../lib/types';

interface ListingCardProps {
    listing: Listing,
    slideDirection?: 'left' | 'right';
}

export default function ListingCard({ listing, slideDirection = 'right' }: ListingCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [zIndex, setZIndex] = useState('z-auto');
    const wrapperRef = useRef<HTMLDivElement>(null);


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
    const menuPositionClass = isRight ? 'right-0 rounded-r-3xl rounded-l-md border-l-0 pl-[60px]' : 'left-0 rounded-l-3xl rounded-r-md border-r-0 pr-[60px]';
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
                className="w-[695px] h-[195px] relative z-20 bg-[#343333] flex border border-gray-800 items-stretch p-4 gap-6 justify-between rounded-3xl cursor-pointer hover:border-gray-700 hover:scale-[1.005] hover:shadow-md transition-all duration-300 ease-out"
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

                <div className="flex flex-col flex-1 justify-between py-2 min-w-0">
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl min-w-0">{listing.title}</span>
                        <div className="flex gap-2 text-lg">
                            <span>{listing.artist}</span>
                            <span>•</span>
                            <span>{listing.year}</span>
                        </div>
                    </div>
                    <div className="flex gap-2 text-lg">
                        <span>{listing.format}</span>
                        <span>•</span>
                        <span>{listing.condition}</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="text-3xl text-lime-600 px-8 font-semibold">${listing.price.toFixed(2)}</span>
                </div>
                <div className="flex flex-col justify-between py-2">
                    <button
                        className="border px-3 py-1.5 rounded-3xl hover:bg-white/10 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        ♥
                    </button>
                    <button
                        className="border px-3 py-1.5 rounded-3xl hover:bg-white/10 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        i
                    </button>
                </div>
            </div>

            {/* Slide menu */}
            <div
                className={`absolute top-0 h-full bg-gray-700 border-gray-600 flex flex-col justify-center items-center gap-6 z-10 transition-all duration-300 ease-in-out border shadow-xl overflow-hidden
                    ${menuPositionClass}
                    ${isOpen ? `w-[340px] ${translateClass}` : `w-[340px] translate-x-0 opacity-0 pointer-events-none`}
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

'use client'
import { useState, useRef, useEffect } from 'react';

interface ListingCardProps {
    slideDirection?: 'left' | 'right';
}

export default function ListingCard({ slideDirection = 'right' }: ListingCardProps) {
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
                className="relative z-20 bg-[#37363f] flex border items-stretch p-4 gap-6 justify-between rounded-3xl cursor-pointer hover:border-gray-400 transition-colors"
            >
                <div className="border w-40 h-40 rounded-3xl bg-gray-400 text-center flex items-center justify-center">Album Art</div>
                <div className="flex flex-col flex-1 justify-between py-2">
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl">Album Title</span>
                        <div className="flex gap-2 text-lg">
                            <span>Artist Name</span>
                            <span>-</span>
                            <span>(Year)</span>
                        </div>
                    </div>
                    <div className="flex gap-2 text-lg">
                        <span>Media Format</span>
                        <span>-</span>
                        <span>Condition</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="text-4xl px-8">$25</span>
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
                className={`absolute top-0 h-full bg-gray-500 flex flex-col justify-center items-center gap-6 z-10 transition-all duration-300 ease-in-out border shadow-xl overflow-hidden
                    ${menuPositionClass}
                    ${isOpen ? `w-[340px] ${translateClass}` : `w-[340px] translate-x-0 opacity-0 pointer-events-none`}
                `}
            >
                <span className="text-2xl text-black font-semibold px-4 text-center">Open Original Listing?</span>
                <div className="flex gap-4">
                    <button className="border-2 border-black text-black text-xl px-8 py-2 rounded-xl hover:bg-black/10 transition-colors font-bold">Yes</button>
                    <button className="border-2 border-black text-black text-xl px-8 py-2 rounded-xl hover:bg-black/10 transition-colors font-bold">No</button>
                </div>
            </div>
        </div>
    )
}

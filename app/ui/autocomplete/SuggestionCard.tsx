import { useState } from 'react';
import { SearchSuggestion } from "@/app/lib/types";
import { Music } from "lucide-react";
import Image from "next/image";

interface SuggestionCardProps {
    suggestion: SearchSuggestion,
    onSelect: (value: string) => void
}

export default function SuggestionCard({ suggestion, onSelect }: SuggestionCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div
            className="flex items-center gap-3 px-2 py-1.5 my-0.5 rounded-xl cursor-pointer transition-all duration-200 ease-out hover:bg-white/40 active:scale-[0.98] group"
            onMouseDown={(e) => {
                e.preventDefault();
                onSelect(`${suggestion.artist} ${suggestion.album}`);
            }}
        >
            <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-[#a8acb3] shadow-sm transition-transform duration-200 group-hover:scale-105">
                {!imageLoaded && (
                    <div
                        className="absolute inset-0 z-10 flex items-center justify-center bg-[#c9cacb] animate-pulse"
                        style={{ animationDuration: '1s' }}
                    >
                        <Music size={18} color="#9ea2a8" />
                    </div>
                )}

                {suggestion.cover ? (
                    <Image
                        src={suggestion.cover}
                        alt={suggestion.album}
                        fill
                        className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        sizes="48px"
                        onLoad={() => setImageLoaded(true)}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#b5b9bf]">
                        <Music size={18} color="#8b8f96" />
                    </div>
                )}
            </div>
            
            <div className="flex items-baseline gap-2 min-w-0 transition-transform duration-200 group-hover:translate-x-0.5">
                <span className="text-base font-bold text-[#404040] truncate">
                    {suggestion.album}
                </span>
                <span className="text-sm text-[#6d6d6d] font-semibold shrink-0 opacity-80">
                    — {suggestion.artist}
                </span>
            </div>
        </div>
    );
}

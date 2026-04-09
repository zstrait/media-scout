'use client'

import { useState, useEffect } from 'react';
import { SearchSuggestion } from '@/app/lib/types';
import SuggestionCard from './SuggestionCard';

interface SuggestionBoxProps {
    query: string,
    onSelect: (value: string) => void
}

export default function SuggestionBox({ query, onSelect }: SuggestionBoxProps) {
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);

    useEffect(() => {
        if (query.length < 2) return;

        let cancelled = false;

        fetch(`/api/autocomplete?query=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(data => { if (!cancelled) setSuggestions(data); })
            .catch(() => { if (!cancelled) setSuggestions([]); });

        return () => { cancelled = true; };
    }, [query]);

    const visibleSuggestions = query.length >= 2 ? suggestions : [];
    if (visibleSuggestions.length === 0) return null;

    return (
        <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-[85%] rounded-b-2xl px-2 py-1.25 z-30 shadow-2xl shadow-black/70 inset-shadow-sm/90"
            style={{
                background: '#D9DBDF',
            }}
        >
            {visibleSuggestions.map((s, index) => (
                <div key={`${s.artist}-${s.album}`}>
                    {index > 0 && <div className="mx-2 border-t border-[#bfc3c9]" />}
                    <SuggestionCard
                        suggestion={s}
                        onSelect={onSelect}
                    />
                </div>
            ))}
        </div>
    );
}

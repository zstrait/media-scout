'use client'

import { useState } from 'react';
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import SuggestionBox from "./autocomplete/SuggestionBox";
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar({ placeholder, width = 'w-xl' }: { placeholder: string, width?: string }) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [inputValue, setInputValue] = useState(searchParams.get('query') ?? '');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [debouncedQuery, setDebouncedQuery] = useState('');
    const debouncedFetch = useDebouncedCallback((value: string) => {
        setDebouncedQuery(value);
    }, 200);

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`/search?${params.toString()}`);
    }

    function handleSelect(value: string) {
        setInputValue(value);
        setShowSuggestions(false);
        handleSearch(value);
    }

    return (
        <div className={`relative flex items-center ${width}`}>
            <Search className="absolute left-4 text-gray-500 pointer-events-none opacity-75 z-30" size={20} strokeWidth={2} />
            <input
                className="relative z-20 w-full bg-gray-300 pl-11 pr-4 py-4 rounded-3xl outline-none text-sm font-semibold text-black placeholder:text-gray-500 shadow-sm inset-shadow-sm/90 transition-colors duration-150 focus:bg-gray-200"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.currentTarget.value);
                    setShowSuggestions(true);
                    debouncedFetch(e.currentTarget.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setShowSuggestions(false);
                        handleSearch(e.currentTarget.value);
                    }
                    if (e.key === 'Escape') setShowSuggestions(false);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
            />
            {showSuggestions && (
                <SuggestionBox query={debouncedQuery} onSelect={handleSelect} />
            )}
        </div>
    );
}

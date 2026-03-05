'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { Search } from "lucide-react"

export default function SearchBar({ placeholder, width = 'w-xl' }: { placeholder: string, width?: string }) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

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

    return (
        <div className={`relative flex items-center ${width}`}>
            <Search className="absolute left-4 text-gray-500 pointer-events-none opacity-75" size={20}  strokeWidth={2} />
            <input
                className="w-full bg-gray-300 pl-11 pr-4 py-4 rounded-3xl outline-none text-sm font-semibold text-black placeholder:text-gray-500 shadow-sm inset-shadow-sm/90 transition-colors duration-150 focus:bg-gray-200 "
                placeholder={placeholder}
                defaultValue={searchParams.get('query')?.toString()}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch(e.currentTarget.value);
                }}
            />
        </div>
    )
}
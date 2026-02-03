'use client'

import { useSearchParams, useRouter } from "next/navigation"

export default function SearchBar({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query')
        }

        replace(`/search?${params.toString()}`)
    }

    return (
        <input
            className='bg-gray-300 w-2xl px-8 py-4 rounded-2xl text-black font-semibold'
            placeholder={placeholder}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSearch(e.currentTarget.value);
                }
            }}
        ></input>
    )
}
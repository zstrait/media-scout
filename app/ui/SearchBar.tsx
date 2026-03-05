'use client'

import { useSearchParams, useRouter } from "next/navigation"

export default function SearchBar({ placeholder, width='w-xl' }: { placeholder: string, width?: string }) {
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
            className={`bg-gray-300 ${width} px-8 py-4 rounded-2xl inset-shadow-sm/90 text-black font-semibold`}
            placeholder={placeholder}
            defaultValue={searchParams.get('query')?.toString()}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSearch(e.currentTarget.value);
                }
            }}
        ></input>
    )
}
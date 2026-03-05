import { Suspense } from 'react';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={
            <div className="h-screen w-full bg-[#1E1E1E] flex items-center justify-center text-gray-200 font-mono">
                Loading Search Results...
            </div>
        }>
            {children}
        </Suspense>
    );
}
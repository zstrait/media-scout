import { Suspense } from 'react';
import SearchBar from "./ui/SearchBar";
import Dither from './ui/Dither';


export default function Home() {
    return (
        <main className="relative h-screen w-full overflow-hidden bg-[#1E1E1E]">
            <div className="absolute inset-0 z-0">
                <Dither
                    waveColor={[0.51, 0.47, 0.5]}
                    disableAnimation={false}
                    colorNum={4}
                    waveAmplitude={0.3}
                    waveFrequency={3}
                    waveSpeed={0.04}
                    enableMouseInteraction={false}
                />
            </div>

            <div className='relative z-10 flex flex-col text-gray-200 h-screen justify-between p-8 font-mono pointer-events-none'>
                <header className='flex justify-between'>
                </header>

                <div className='flex flex-col items-center gap-8 mb-4 pointer-events-auto'>
                    <div className="relative inline-block">
                        <div className="absolute inset-0 translate-y-1.5 rounded-2xl bg-black/65 blur-xl scale-120" />
                        <h1 className="relative text-7xl pb-1 px-1 rounded-2xl font-['Chelsea_Market'] opacity-98">
                            Media Scout
                        </h1>
                    </div>
                    <Suspense fallback={<div className="h-14 w-2xl bg-gray-300 rounded-2xl animate-pulse" />}>
                        <SearchBar placeholder='Search for an album...' width='w-2xl' />
                    </Suspense>
                </div>

                <footer className='flex justify-end pointer-events-auto'>
                    <div className="relative inline-block">
                        <div className="absolute inset-0 translate-y-1 rounded-full bg-black blur-md scale-110" />
                        <a
                            className="relative block w-12 h-12 bg-[url('/github-logo.svg')] bg-contain bg-no-repeat bg-center opacity-95 hover:opacity-100 hover:scale-105 transition-transform duration-300 cursor-pointer z-10"
                            href="https://github.com/zstrait/media-scout"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                        />
                    </div>
                </footer>
            </div>
        </main>
    );
}
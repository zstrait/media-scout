import SearchBar from "./ui/SearchBar";

export default function Home() {
    return (
        <>
            <div className='flex flex-col align-center bg-[#1E1E1E] text-gray-200 h-screen justify-between p-8 font-mono'>
                <header className='flex justify-between'>
                    <button>NavMenu</button>
                    <div className='flex justify-center gap-8 '>
                        <button className="btn-1">darkmode</button>
                        <button className="btn-1">account</button>
                    </div>
                </header>
                <div className='flex flex-col items-center gap-8 mb-24'>
                    <h1 className='text-6xl'>Media Scout</h1>
                    <SearchBar placeholder='Search for album...' />
                </div>
                <footer className='flex justify-end'>
                    <a className='hover:text-blue-300 hover:underline underline-offset-4 cursor-pointer' href="https://github.com/zstrait/media-scout" target="_blank">github</a>
                </footer>
            </div>
        </>
    );
}

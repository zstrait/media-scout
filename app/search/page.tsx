import ListingCard from "../ui/search/ListingCard";
import SearchBar from "../ui/SearchBar";


export default function Page() {

    return (
        <>
            <div className='flex flex-col align-center bg-[#2B2A32] text-gray-200 h-screen justify-between p-4 pb-0 font-mono'>

                <div className="flex flex-col gap-6">
                    <header className='flex justify-between items-center'>
                        <button>NavMenu</button>
                        <SearchBar placeholder='Search...'/>
                        <div className='flex justify-center gap-8 '>
                            <button className="btn-1">darkmode</button>
                            <button className="btn-1">account</button>
                        </div>
                    </header>

                    <div className="flex justify-between border-t border-dashed p-6">
                        <span className="underline underline-offset-4 font-bold text-2xl">1,253 Results</span>
                        <div className="flex justify-center items-center gap-8 ">
                            <button className="btn-1">filter</button>
                            <button className="btn-1">sort</button>
                        </div>
                    </div>
                </div>

                <div className="flex h-full overflow-scroll justify-between px-3">
                    <div className="flex flex-col gap-8">
                        <ListingCard />
                        <ListingCard />
                        <ListingCard />
                        <ListingCard />
                        <ListingCard />
                    </div>
                    <div className="flex flex-col gap-8">
                        <ListingCard />
                        <ListingCard />
                        <ListingCard />
                        <ListingCard />
                        <ListingCard />
                    </div>
                </div>
            </div>
        </>
    );
}
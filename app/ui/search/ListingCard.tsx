export default function ListingCard() {
    return (
        <>
            <div className="bg-[#37363f] flex border items-center p-4 gap-6 justify-between rounded-3xl">
                <div className="border w-40 h-40 rounded-3xl bg-gray-400 text-center">Album Art</div>
                <div className="flex flex-col h-full justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl">Album Title</span>
                        <div className="flex gap-2 text-lg">
                            <span>Artist Name</span>
                            <span>-</span>
                            <span>(Year)</span>
                        </div>
                    </div>
                    <div className="flex gap-2 text-lg">
                        <span>Media Format</span>
                        <span>-</span>
                        <span>Condition</span>
                    </div>
                </div>
                <div>
                    <span className="text-4xl px-8">$25</span>
                </div>
                <div className="flex flex-col h-full justify-between">
                    <button className="border px-3 py-1.5 rounded-3xl">♥</button>
                    <button className="border px-3 py-1.5 rounded-3xl">i</button>
                </div>
            </div>
        </>
    )
}
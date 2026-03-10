'use client'

export default function EmptyWatchlist() {
    return (
        <div className="flex flex-col items-center w-full gap-38">
            <div className="flex flex-col justify-center items-center gap-2 pt-80 opacity-80">
                <span className="text-2xl font-semibold">
                    Your watchlist is empty.
                </span>
                <span className="text-md opacity-70">
                    Any listings that you favorite will appear here.
                </span>
            </div>
        </div>
    )
}
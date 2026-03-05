'use client'

export default function NoResults({ search }: { search: string }) {
    return (
        <div className="flex flex-col items-center w-full gap-38">
            <span className="underline underline-offset-6 pl-8 pt-1 font-bold text-2xl self-start opacity-80">
                0 Results
            </span>
            <div className="flex flex-col justify-center items-center gap-2 py-24 opacity-80">
                <span className="text-2xl font-semibold">
                    No results for <b>&ldquo;{search}&rdquo;</b>
                </span>
                <span className="text-md opacity-70">
                    Try checking the spelling or searching for a different album
                </span>
            </div>
        </div>
    )
}

export default function Home() {
    return (
        <>
            <div className='flex flex-col align-center bg-[#2B2A32] text-gray-200 h-screen justify-between p-8 font-mono'>
                <header className='flex justify-between'>
                    <button>NavMenu</button>
                    <div className='flex justify-center gap-8 '>
                        <button className="btn-1">darkmode</button>
                        <button className="btn-1">account</button>
                    </div>
                </header>
                <div className='flex flex-col items-center gap-8 mb-24'>
                    <h1 className='text-6xl'>Media Scout</h1>
                    <input className='bg-gray-300 w-2xl px-8 py-4 rounded-2xl text-black font-semibold' placeholder='Search for album...'></input>
                </div>
                <footer className='flex justify-end'>
                    <a className='hover:text-blue-300 hover:underline underline-offset-4 cursor-pointer' >github</a>
                </footer>
            </div>
        </>
    );
}

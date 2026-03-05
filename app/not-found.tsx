import Link from 'next/link';
import { Disc3 } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-[#1E1E1E] text-gray-200 font-mono">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-black/50 blur-xl rounded-full scale-150" />
        <Disc3 size={120} strokeWidth={1} className="relative z-10 opacity-80" />
      </div>
      <h1 className="text-6xl font-bold mb-4 tracking-tighter">404</h1>
      <h2 className="text-2xl opacity-80 mb-8">Sorry, this page is unavailable</h2>

      <Link 
        href="/"
        className="px-8 py-4 bg-gray-300 text-black font-semibold rounded-2xl hover:bg-white hover:scale-105 transition-all duration-300 inset-shadow-sm/90"
      >
        Return to Home
      </Link>
    </div>
  );
}
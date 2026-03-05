import { ExternalLink, X } from 'lucide-react';

interface SlideMenuProps {
    isRight: boolean,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    source: string,
    sourceLink: string
}

export default function SlideMenu({ isRight, isOpen, setIsOpen, source, sourceLink }: SlideMenuProps) {
    const menuPositionClass = isRight
        ? 'right-0 rounded-r-3xl rounded-l-md pl-[28px]'
        : 'left-0 rounded-l-3xl rounded-r-md pr-[28px]';

    return (
        <div
            className={`absolute top-0 h-full w-[276px] flex flex-col justify-center items-center z-10 transition-all duration-300 overflow-hidden
                ${menuPositionClass}
                ${isOpen ? (isRight ? 'translate-x-[242px]' : '-translate-x-[242px]') : 'translate-x-0 opacity-0 pointer-events-none'}
            `}
            style={{
                background: '#32303c',
                border: '1px solid #46434f',
                boxShadow: isRight ? '-8px 0 30px rgba(0,0,0,0.8)' : '8px 0 30px rgba(0,0,0,0.8)',
                clipPath: isRight ? 'inset(0 -40px 0 0)' : 'inset(0 0 0 -40px)'
            }}
        >
            <button
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className={`absolute ${isRight ? 'right-3' : 'left-3'} top-2 text-[#5a5769] hover:text-[#9a97aa] transition-colors duration-150 p-1`}
            >
                <X size={30} strokeWidth={2.2} />
            </button>
            <div
                className={`flex flex-col items-center gap-2 transition-all duration-200 ease-out ${isOpen ? 'opacity-100' : 'opacity-0 translate-y-2'}`}
                style={{ transitionDelay: isOpen ? '130ms' : '0ms' }}
            >
                <p className="text-[20px] text-[#807c95] uppercase tracking-[0.18em] font-semibold">{source}</p>
                <a
                    href={sourceLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-2xl text-[15px] font-medium text-[#c4c0d8d3] transition-all duration-150 active:scale-[0.97] hover:text-white"
                    style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.11)',
                    }}
                >
                    <ExternalLink size={16} strokeWidth={1.8} /> View Listing
                </a>
            </div>
        </div>
    );
}
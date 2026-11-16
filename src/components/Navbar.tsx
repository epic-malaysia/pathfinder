import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Mission', href: '#mission' },
  { label: 'Pathfinders', href: '#pathfinder' },
  { label: 'Training', href: '#training' },
  { label: 'About EPIC', href: '#about' },
];

const REGISTER_URL = 'https://forms.gle/94ckPd8yCP1fF2zT9';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[#1F1B18]/12 bg-[#FBF8F1]/95 backdrop-blur-sm print:static print:border-[#1F1B18]/20 print:bg-white print:backdrop-blur-none">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8 lg:px-8 print:h-auto print:max-w-none print:px-0 print:pb-2.5 print:pt-0">
        {/* Zone 1: Brand Logo */}
        <a
          href="https://epic.my"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="EPIC website"
          className="inline-flex min-h-[40px] shrink-0 items-center whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff821e] print:min-h-0"
        >
          {!logoError ? (
            <img
              src="/assets/aistudio/Epic_Logo_4df8a1b2.png"
              alt="EPIC"
              referrerPolicy="no-referrer"
              onError={() => setLogoError(true)}
              className="h-8 w-auto object-contain sm:h-9 print:h-6"
            />
          ) : (
            <span className="font-display text-[22px] font-semibold tracking-tight text-[#ff821e] print:text-[18px]">
              epic
            </span>
          )}
        </a>

        {/* Zone 2: 4 Concise Anchor Links (Desktop) */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex print:hidden">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 whitespace-nowrap py-2 text-[15px] font-medium text-[#1F1B18]/80 underline-offset-[6px] transition-colors duration-150 hover:text-[#1F1B18] hover:underline hover:decoration-[#ff821e] hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff821e]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary CTA Button + Mobile Drawer Toggle */}
        <div className="flex shrink-0 items-center gap-2 print:hidden">
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-[#ff821e] px-4 py-2 text-sm font-bold text-[#1F1B18] transition-colors duration-150 hover:bg-[#eb710e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F1B18]"
          >
            Register Your Interest Here
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-[#1F1B18] transition-colors duration-150 hover:bg-[#1F1B18]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff821e] md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>

        {/* Print-only masthead metadata */}
        <div className="hidden text-right text-[9.5px] font-medium text-[#1F1B18]/75 print:block">
          <span className="font-semibold text-[#B84D00]">epic.my</span>
          <span aria-hidden="true" className="mx-1.5 text-[#1F1B18]/35">
            ·
          </span>
          <span>Register: forms.gle/94ckPd8yCP1fF2zT9</span>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div
          id="mobile-nav-drawer"
          className="border-t border-[#1F1B18]/12 bg-[#FFFDF9] px-4 pb-5 pt-3 shadow-lg md:hidden print:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[44px] items-center border-b border-[#1F1B18]/10 px-2 text-base font-medium text-[#1F1B18] transition-colors duration-150 hover:bg-[#FBF8F1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff821e]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-4">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-[48px] w-full items-center justify-center rounded-md bg-[#ff821e] px-5 py-3 text-center text-[15px] font-bold text-[#1F1B18] transition-colors duration-150 hover:bg-[#eb710e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F1B18]"
            >
              Register Your Interest Here
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

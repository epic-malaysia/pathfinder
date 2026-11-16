import type { ReactNode } from 'react';

interface TealUnderlineProps {
  children: ReactNode;
  variant?: 'light' | 'dark';
}

export function TealUnderline({ children }: TealUnderlineProps) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 220 14"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-1 left-0 z-0 h-3 w-full print:-bottom-0.5 print:h-2"
      >
        <path
          d="M2 9.8C54 4.2 128 3.2 218 8.4"
          stroke="#ff821e"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M16 11.8C72 8.2 146 7.4 204 10.6"
          stroke="#ff821e"
          strokeOpacity="0.45"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

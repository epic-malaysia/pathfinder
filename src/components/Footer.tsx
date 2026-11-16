import { Download, Loader2 } from 'lucide-react';

const FB_URL = 'https://www.facebook.com/theepichomes';
const IG_URL = 'https://www.instagram.com/the.epichomes/';

interface FooterProps {
  onDownloadPdf: () => void;
  isExporting: boolean;
  exportError: string | null;
}

export function Footer({ onDownloadPdf, isExporting, exportError }: FooterProps) {
  return (
    <footer className="bg-journal-paper border-t border-[#1F1B18]/15 py-8 text-[#1F1B18] sm:py-10 print:border-[#1F1B18]/20 print:bg-white print:py-2">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 print:max-w-none print:px-0">
        <div className="flex flex-col gap-4 text-sm text-[#1F1B18]/80 md:flex-row md:items-center md:justify-between print:flex-row print:items-center print:justify-between print:gap-4 print:text-[9px]">
          <p className="leading-relaxed print:leading-normal">
            <strong className="font-display text-base font-semibold text-[#1F1B18] print:text-[11px]">
              EPIC
            </strong>{' '}
            <span aria-hidden="true" className="mx-1 text-[#1F1B18]/35">
              —
            </span>
            Extraordinary People Impacting Communities{' '}
            <span aria-hidden="true" className="mx-1.5 text-[#1F1B18]/35">
              |
            </span>{' '}
            <span className="tabular-nums text-[#1F1B18]/70">Epic Society PPM-014-10-28112013</span>
          </p>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 print:gap-x-1.5">
            <a
              href="mailto:info@epic.my"
              className="inline-flex min-h-[44px] items-center font-medium text-[#1F1B18] underline decoration-[#ff821e] decoration-[1.5px] underline-offset-4 transition-colors duration-150 hover:text-[#B84D00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff821e] md:min-h-0 print:min-h-0 print:no-underline"
            >
              info@epic.my
            </a>
            <span aria-hidden="true" className="text-[#1F1B18]/35">
              ·
            </span>
            <a
              href={FB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center font-medium text-[#1F1B18] underline decoration-[#ff821e] decoration-[1.5px] underline-offset-4 transition-colors duration-150 hover:text-[#B84D00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff821e] md:min-h-0 print:min-h-0 print:no-underline"
            >
              FB
            </a>
            <span aria-hidden="true" className="text-[#1F1B18]/35">
              |
            </span>
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center font-medium text-[#1F1B18] underline decoration-[#ff821e] decoration-[1.5px] underline-offset-4 transition-colors duration-150 hover:text-[#B84D00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff821e] md:min-h-0 print:min-h-0 print:no-underline"
            >
              IG @the.epichomes
            </a>
          </div>
        </div>

        {/* Bottom 1-Page PDF Download Action (excluded from PDF capture & print) */}
        <div
          data-export-exclude="true"
          className="mt-6 flex flex-col items-start gap-2 border-t border-[#1F1B18]/12 pt-5 sm:flex-row sm:items-center sm:justify-between print:hidden"
        >
          <p className="text-[13px] text-[#1F1B18]/70">
            Save a single-page copy of this volunteer brief for sharing offline.
          </p>
          <button
            type="button"
            onClick={onDownloadPdf}
            disabled={isExporting}
            className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-[#1F1B18]/20 bg-[#FFFDF9] px-5 py-2.5 text-sm font-semibold text-[#1F1B18] transition-colors duration-150 hover:border-[#ff821e] hover:bg-[#ff821e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F1B18] disabled:cursor-wait disabled:opacity-70"
          >
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
                <span>Generating PDF…</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Download 1-Page PDF</span>
              </>
            )}
          </button>
        </div>

        {exportError && (
          <p
            data-export-exclude="true"
            role="status"
            className="mt-2 text-xs font-medium text-[#B84D00] print:hidden"
          >
            {exportError}
          </p>
        )}
      </div>
    </footer>
  );
}

import { ArrowUpRight, Compass } from 'lucide-react';
import { useState } from 'react';
import { withBase } from '../utils/assetPath';
import { TealUnderline } from './TealUnderline';

const SEDUNIA_URL =
  'https://www.sedunia.me/missions/mapping-kampung-orang-asli-tanah-abang-mersing-johor';
const VILLAGE_IMAGE_PATH = withBase('/src/assets/images/regenerated_image_1794845523601.png');

const KEY_DETAILS = [
  { label: 'Mission Date', value: 'Sat, 12 December 2026' },
  { label: 'Time', value: '10:00 AM – 5:00 PM' },
  { label: 'Pathfinders Needed', value: '45 volunteers' },
  { label: 'Location', value: 'Mersing, Johor' },
];

export function HeroSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="mission"
      className="bg-journal-paper relative overflow-hidden border-b border-[#1F1B18]/12 py-14 text-[#1F1B18] sm:py-20 lg:py-24 print:border-[#1F1B18]/20 print:bg-white print:py-3.5"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-y-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-8 lg:px-8 print:max-w-none print:grid-cols-12 print:gap-x-5 print:gap-y-2.5 print:px-0">
        {/* 1. Headline & Intro Copy */}
        <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1 print:col-span-7 print:col-start-1 print:row-start-1">
          <h1
            className="font-display text-balance font-semibold tracking-[-0.02em] text-[#1F1B18] print:!text-[26px] print:!leading-[1.06]"
            style={{ fontSize: 'clamp(2.5rem, 4.7vw, 4rem)', lineHeight: 1.06 }}
          >
            Big change starts with{' '}
            <TealUnderline>
              <span className="italic">small conversations.</span>
            </TealUnderline>
          </h1>

          <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.75] text-[#1F1B18]/85 sm:text-base print:mt-2.5 print:max-w-none print:text-[10.5px] print:leading-[1.45]">
            We’re looking for 45 volunteers to help us capture the stories, dreams, and everyday
            needs of Kampung Orang Asli Tanah Abang in Mersing, Johor. The information we gather
            together will shape their community development plan, creating opportunities for
            volunteers and collaborators to make it a reality. We call these volunteers: Pathfinders.
          </p>
        </div>

        {/* 2. Tactile Photographic Print (appears before mission details on smaller screens, right column on desktop) */}
        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 lg:self-center print:col-span-5 print:col-start-8 print:row-start-1 print:row-span-2 print:pt-1">
          <div className="relative mx-auto max-w-lg pt-3 lg:max-w-none print:pt-2">
            {/* Subtle top masking tape strips */}
            <div
              aria-hidden="true"
              className="masking-tape pointer-events-none absolute left-4 top-0 z-20 h-6 w-20 -rotate-12 print:left-3 print:h-3.5 print:w-12"
            />
            <div
              aria-hidden="true"
              className="masking-tape pointer-events-none absolute right-5 top-0.5 z-20 h-6 w-20 rotate-12 print:right-3 print:h-3.5 print:w-12"
            />

            <figure className="relative border border-[#1F1B18]/15 bg-[#FFFDF9] p-3 shadow-[0_18px_38px_rgba(31,27,24,0.13)] transition-transform duration-300 sm:p-3.5 lg:rotate-[1.5deg] lg:hover:rotate-0 print:rotate-[1deg] print:p-1.5 print:shadow-none">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE3D2]">
                {!imgError ? (
                  <>
                    <img
                      src={VILLAGE_IMAGE_PATH}
                      alt="Volunteers and Kampung Orang Asli villagers having a warm conversation on a wooden veranda in Johor"
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="h-full w-full object-cover sepia-[0.14] contrast-[1.07] saturate-[0.94] brightness-[0.99] print:sepia-0 print:contrast-[1.02] print:saturate-100"
                    />
                    {/* Subtle warm film-grain and soft darkroom vignette */}
                    <div
                      aria-hidden="true"
                      className="film-grain-overlay pointer-events-none absolute inset-0"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#3B2314]/15 via-transparent to-[#ff821e]/10 print:hidden"
                    />
                  </>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#F3ECE0] p-6 text-center text-[#1F1B18]/80">
                    <Compass className="h-10 w-10 text-[#ff821e]" aria-hidden="true" />
                    <p className="font-display text-base italic">
                      Kampung Orang Asli Tanah Abang, Mersing, Johor
                    </p>
                  </div>
                )}
              </div>
            </figure>
          </div>
        </div>

        {/* 3. Mission Key Details Ledger & CTA */}
        <div className="lg:col-span-7 lg:col-start-1 lg:row-start-2 print:col-span-7 print:col-start-1 print:row-start-2">
          <div className="border-t border-[#1F1B18]/15 pt-6 print:pt-2">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 print:grid-cols-2 print:gap-x-4 print:gap-y-1.5">
              {KEY_DETAILS.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-[#1F1B18]/12 pb-3.5 print:pb-1.5"
                >
                  <dt className="text-[13px] font-semibold text-[#B84D00] print:text-[8.5px]">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-base font-semibold tabular-nums text-[#1F1B18] print:mt-0.5 print:text-[10.5px]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 border-b border-[#1F1B18]/12 pb-3.5 print:mt-1.5 print:pb-1.5">
              <span className="text-[13px] font-semibold text-[#B84D00] print:text-[8.5px]">
                Criteria
              </span>
              <p className="mt-1 text-[15px] font-medium leading-relaxed text-[#1F1B18] sm:text-base print:mt-0.5 print:text-[10px] print:leading-snug">
                18+, able to speak in BM &amp; attend training on Nov 28.
              </p>
            </div>
          </div>

          <div className="mt-8 print:mt-2.5">
            <a
              href={SEDUNIA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[#ff821e] px-6 py-3.5 text-[15px] font-bold text-[#1F1B18] transition-colors duration-150 hover:bg-[#eb710e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F1B18] sm:w-auto print:min-h-0 print:w-auto print:rounded-sm print:px-3 print:py-1 print:text-[10px]"
            >
              <span>Find out more about the Mission here</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 print:h-3 print:w-3" aria-hidden="true" />
            </a>
            <p className="hidden pt-1 text-[8.5px] text-[#1F1B18]/65 print:block">
              sedunia.me/missions/mapping-kampung-orang-asli-tanah-abang-mersing-johor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

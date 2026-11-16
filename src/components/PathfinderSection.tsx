import { Compass } from 'lucide-react';
import { useState } from 'react';
import { withBase } from '../utils/assetPath';
import { TealUnderline } from './TealUnderline';

const PATHFINDER_PHOTO_PATH = withBase('/src/assets/images/regenerated_image_1794847870140.png');

export function PathfinderSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="pathfinder"
      className="border-b border-[#1F1B18]/12 bg-[#FFFDF9] py-12 text-[#1F1B18] sm:py-16 print:border-[#1F1B18]/20 print:bg-white print:py-3"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8 print:max-w-none print:grid-cols-12 print:items-start print:gap-5 print:px-0">
        {/* Left Column on Desktop: Tactile Field Print Photo */}
        <div className="order-2 lg:order-1 lg:col-span-5 print:order-1 print:col-span-5">
          <div className="relative mx-auto max-w-lg pt-3 lg:max-w-none print:pt-1.5">
            {/* Subtle top masking tape strips */}
            <div
              aria-hidden="true"
              className="masking-tape pointer-events-none absolute left-4 top-0 z-20 h-6 w-20 -rotate-12 print:left-3 print:h-3.5 print:w-12"
            />
            <div
              aria-hidden="true"
              className="masking-tape pointer-events-none absolute right-5 top-0.5 z-20 h-6 w-20 rotate-12 print:right-3 print:h-3.5 print:w-12"
            />

            <figure className="relative border border-[#1F1B18]/15 bg-[#FFFDF9] p-3 shadow-[0_18px_38px_rgba(31,27,24,0.13)] transition-transform duration-300 sm:p-3.5 lg:-rotate-[1.2deg] lg:hover:rotate-0 print:-rotate-[0.8deg] print:p-1.5 print:shadow-none">
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#EAE3D2]">
                {!imgError ? (
                  <>
                    <img
                      src={PATHFINDER_PHOTO_PATH}
                      alt="Two EPIC Pathfinder volunteers in orange shirts reviewing field notes together during a community visit"
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="h-full w-full object-cover object-top sepia-[0.1] contrast-[1.05] saturate-[0.96] print:sepia-0 print:contrast-[1.02] print:saturate-100"
                    />
                    <div
                      aria-hidden="true"
                      className="film-grain-overlay pointer-events-none absolute inset-0"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#3B2314]/10 via-transparent to-[#ff821e]/8 print:hidden"
                    />
                  </>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#F3ECE0] p-6 text-center text-[#1F1B18]/80">
                    <Compass className="h-10 w-10 text-[#ff821e]" aria-hidden="true" />
                    <p className="font-display text-base italic">
                      EPIC Pathfinder Volunteers in the Field
                    </p>
                  </div>
                )}
              </div>
            </figure>
          </div>
        </div>

        {/* Right Column on Desktop: Story & Bold Statement */}
        <div className="order-1 lg:order-2 lg:col-span-7 print:order-2 print:col-span-7">
          <h2
            className="font-display text-balance font-semibold tracking-[-0.02em] text-[#1F1B18] print:!text-[19px] print:!leading-[1.1]"
            style={{ fontSize: 'clamp(2.15rem, 4vw, 3rem)', lineHeight: 1.1 }}
          >
            What&apos;s A <TealUnderline>Pathfinder?</TealUnderline>
          </h2>

          <p className="mt-5 max-w-[62ch] text-[15.5px] leading-[1.8] text-[#1F1B18]/88 sm:text-[17px] first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-5xl first-letter:font-semibold first-letter:leading-none first-letter:text-[#ff821e] print:mt-2 print:max-w-none print:text-[10.5px] print:leading-[1.5] print:first-letter:mr-2 print:first-letter:mt-0.5 print:first-letter:text-[26px]">
            A Pathfinder is a volunteer who takes the first step in getting to know a community.
            Pathfinders visit villages, meet the people who live there and have conversations to
            better understand their everyday lives, experiences and hopes for the future. They hold
            respectful, one-on-one conversations with villagers in Bahasa Malaysia and capture their
            stories accurately.
          </p>

          <p className="mt-5 font-display text-xl font-semibold leading-snug text-[#1F1B18] sm:text-2xl print:mt-2 print:text-[12px]">
            A Pathfinder is not an expert - just a neighbour who knows how to listen.
          </p>
        </div>
      </div>
    </section>
  );
}

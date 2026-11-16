import { ArrowUpRight, MapPin } from 'lucide-react';
import { TealUnderline } from './TealUnderline';

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/cc2UgZ9RWF1fihsKA';
const REGISTER_URL = 'https://forms.gle/94ckPd8yCP1fF2zT9';

const TRAINING_POINTS = [
  {
    num: '01.',
    title: 'Respectful village entry',
    description:
      'Navigate a village visit respectfully using EPIC’s core principles for working alongside communities.',
  },
  {
    num: '02.',
    title: 'Stories into clear records',
    description:
      'Turn casual family chats into clear, accurate village records so nothing gets lost in translation.',
  },
  {
    num: '03.',
    title: 'Community-led questions',
    description:
      'Ask questions that empower villagers to share their own priorities rather than speaking for them.',
  },
  {
    num: '04.',
    title: 'Local cultural context',
    description:
      'Learn about the Orang Asli before stepping foot in the village and broaden your perspective.',
  },
];

export function TrainingSection() {
  return (
    <section
      id="training"
      className="bg-journal-paper border-b border-[#1F1B18]/12 py-16 text-[#1F1B18] sm:py-20 print:border-[#1F1B18]/20 print:bg-white print:py-3.5"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 print:max-w-none print:grid-cols-12 print:gap-5 print:px-0">
        {/* Left Column: Lined Field-Notebook Entries */}
        <div className="lg:col-span-7 print:col-span-7">
          <h2
            className="font-display text-balance font-semibold tracking-[-0.02em] text-[#1F1B18] print:!text-[19px] print:!leading-[1.1]"
            style={{ fontSize: 'clamp(2.15rem, 4vw, 3rem)', lineHeight: 1.1 }}
          >
            How do I start? Join the{' '}
            <TealUnderline>Pathfinder Training.</TealUnderline>
          </h2>

          <p className="mt-5 max-w-[60ch] text-[15px] leading-[1.75] text-[#1F1B18]/85 sm:text-base print:mt-1.5 print:max-w-none print:text-[10px] print:leading-[1.4]">
            In this hands-on training workshop, you will gain the mindset and skills to interact
            with the community:
          </p>

          {/* Field Notebook Page */}
          <div className="bg-notebook-lines mt-7 border border-[#1F1B18]/15 shadow-[0_10px_28px_rgba(31,27,24,0.06)] print:mt-2.5 print:shadow-none">
            <ol className="divide-y divide-[#1F1B18]/12">
              {TRAINING_POINTS.map((point) => (
                <li
                  key={point.num}
                  className="grid grid-cols-[54px_1fr] sm:grid-cols-[72px_1fr] print:grid-cols-[36px_1fr]"
                >
                  {/* Left notebook margin column */}
                  <div className="flex items-start justify-center border-r border-[#ff821e]/45 py-5 print:py-2">
                    <span className="font-display text-lg font-semibold italic tabular-nums text-[#B84D00] sm:text-xl print:text-[12px]">
                      {point.num}
                    </span>
                  </div>

                  {/* Ruled entry content */}
                  <div className="px-4 py-5 sm:px-6 print:px-3 print:py-2">
                    <h3 className="font-display text-lg font-semibold text-[#1F1B18] sm:text-xl print:text-[11.5px] print:leading-tight">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-[1.68] text-[#1F1B18]/85 sm:text-base print:mt-0.5 print:text-[9.5px] print:leading-[1.35]">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right Column: Taped Workshop Bulletin Card with #ff821e Orange Header */}
        <div className="lg:col-span-5 lg:pt-6 print:col-span-5 print:pt-0">
          <div className="relative pt-3 print:pt-2">
            <div
              aria-hidden="true"
              className="masking-tape pointer-events-none absolute left-5 top-0 z-10 h-6 w-20 -rotate-6 print:left-3 print:h-3.5 print:w-12"
            />
            <div
              aria-hidden="true"
              className="masking-tape pointer-events-none absolute right-5 top-0 z-10 h-6 w-20 rotate-6 print:right-3 print:h-3.5 print:w-12"
            />

            <div className="overflow-hidden border border-[#1F1B18]/15 bg-[#FFFDF9] shadow-[0_16px_34px_rgba(31,27,24,0.09)] print:shadow-none">
              {/* Warm Orange Header Band */}
              <div className="border-b border-[#1F1B18]/15 bg-[#ff821e] px-6 py-5 text-[#1F1B18] print:px-3.5 print:py-2.5">
                <p className="text-[12px] font-bold tracking-wide text-[#1F1B18]/80 print:text-[8.5px]">
                  Workshop Details · Kulai, Johor
                </p>
                <h3 className="font-display mt-1 text-2xl font-semibold tracking-tight sm:text-[26px] print:mt-0.5 print:text-[16px] print:leading-tight">
                  The Pathfinder Training
                </h3>
              </div>

              {/* Card Body */}
              <div className="space-y-5 p-6 sm:p-7 print:space-y-2 print:p-3.5">
                <div className="border-b border-[#1F1B18]/12 pb-4 print:pb-2">
                  <div className="text-[13px] font-semibold text-[#B84D00] print:text-[8.5px]">
                    Date &amp; Time
                  </div>
                  <div className="mt-1 text-base font-semibold tabular-nums text-[#1F1B18] print:mt-0.5 print:text-[10.5px]">
                    Sat, 28 Nov 2026 · 2:00 PM – 5:00 PM
                  </div>
                </div>

                <div className="border-b border-[#1F1B18]/12 pb-4 print:pb-2">
                  <div className="text-[13px] font-semibold text-[#B84D00] print:text-[8.5px]">
                    Venue
                  </div>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-1 inline-flex items-start gap-2 text-[15px] font-semibold text-[#1F1B18] underline decoration-[#ff821e] decoration-2 underline-offset-4 transition-colors duration-150 hover:text-[#B84D00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff821e] sm:text-base print:mt-0.5 print:gap-1 print:text-[10px] print:leading-snug print:no-underline"
                  >
                    <MapPin
                      className="mt-1 h-4 w-4 shrink-0 text-[#B84D00] group-hover:text-[#1F1B18] print:mt-0.5 print:h-3 print:w-3"
                      aria-hidden="true"
                    />
                    <span>Placemaking Association of Johor, A57 Jalan Ismail, Kulai</span>
                  </a>
                </div>

                <div className="pb-1 print:pb-1">
                  <div className="text-[13px] font-semibold text-[#B84D00] print:text-[8.5px]">
                    Capacity &amp; Deadline
                  </div>
                  <div className="mt-1 text-base font-semibold tabular-nums text-[#1F1B18] print:mt-0.5 print:text-[10.5px]">
                    30 spots only · Register by 20 Nov 2026
                  </div>
                </div>

                <div>
                  <a
                    href={REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[#ff821e] px-5 py-3.5 text-center text-[15px] font-bold leading-snug text-[#1F1B18] transition-colors duration-150 hover:bg-[#eb710e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F1B18] print:min-h-0 print:rounded-sm print:px-3 print:py-1.5 print:text-[10px]"
                  >
                    <span>Register Your Interest Here</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 print:h-3 print:w-3" aria-hidden="true" />
                  </a>
                  <p className="hidden pt-1 text-center text-[8.5px] text-[#1F1B18]/70 print:block">
                    forms.gle/94ckPd8yCP1fF2zT9
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

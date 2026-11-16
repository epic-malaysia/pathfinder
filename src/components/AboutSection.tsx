const FB_URL = 'https://www.facebook.com/theepichomes';
const IG_URL = 'https://www.instagram.com/the.epichomes/';

const AWARDS = [
  'Changemaker Award, MCIEA 2026',
  'iF Design Social Impact Prize (2026)',
  'ASEAN Outstanding Social Welfare and Development Award (2023)',
];

const MEDIA_FEATURES = [
  'The Edge Malaysia',
  'New Straits Times',
  'Free Malaysia Today',
  '8TV',
  'BFM.my',
];

export function AboutSection() {
  return (
    <section id="about" className="bg-[#FFFDF9] py-16 text-[#1F1B18] sm:py-20 print:bg-white print:py-3">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 print:max-w-none print:px-0">
        <div className="max-w-3xl print:max-w-none">
          <p className="text-[13px] font-semibold tracking-wide text-[#B84D00] print:text-[8.5px]">
            About the Organiser
          </p>

          <h2
            className="font-display mt-2 text-balance font-semibold tracking-[-0.02em] text-[#1F1B18] print:mt-0.5 print:!text-[18px] print:!leading-[1.1]"
            style={{ fontSize: 'clamp(2.15rem, 4vw, 3rem)', lineHeight: 1.1 }}
          >
            Meet EPIC: Extraordinary People Impacting Communities
          </h2>

          <p className="mt-5 text-[15px] leading-[1.75] text-[#1F1B18]/85 sm:text-base print:mt-1.5 print:text-[10px] print:leading-[1.42]">
            EPIC is a multiple award-winning Malaysian social enterprise, founded in 2010. We bring
            people from all walks of life together to build stronger, more resilient communities.
            From building homes to planting farms, we bring together villagers and volunteers to
            make it happen. We’re looking to build a community of volunteers with a wide range of
            skills and experiences. Find us on{' '}
            <a
              href={FB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#B84D00] underline decoration-[#ff821e] decoration-2 underline-offset-4 transition-colors duration-150 hover:text-[#1F1B18] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff821e] print:no-underline"
            >
              FB
            </a>{' '}
            <span aria-hidden="true" className="text-[#1F1B18]/35">
              |
            </span>{' '}
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#B84D00] underline decoration-[#ff821e] decoration-2 underline-offset-4 transition-colors duration-150 hover:text-[#1F1B18] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff821e] print:no-underline"
            >
              Instagram @the.epichomes
            </a>
          </p>
        </div>

        {/* Recognised by & As featured in */}
        <div className="mt-10 grid grid-cols-1 gap-8 border-t border-[#1F1B18]/15 pt-8 md:grid-cols-2 md:gap-12 print:mt-2.5 print:grid-cols-2 print:gap-6 print:pt-2">
          <div>
            <h3 className="font-display text-lg font-semibold italic text-[#B84D00] print:text-[11px]">
              Recognised by
            </h3>
            <ul className="mt-3 space-y-2.5 text-[15px] font-medium text-[#1F1B18] sm:text-base print:mt-1 print:space-y-0.5 print:text-[9.5px] print:leading-snug">
              {AWARDS.map((award) => (
                <li key={award} className="tabular-nums">
                  {award}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold italic text-[#B84D00] print:text-[11px]">
              As featured in
            </h3>
            <p className="mt-3 text-[15px] font-medium leading-relaxed text-[#1F1B18] sm:text-base print:mt-1 print:text-[9.5px] print:leading-snug">
              {MEDIA_FEATURES.map((outlet, index) => (
                <span key={outlet}>
                  {outlet}
                  {index < MEDIA_FEATURES.length - 1 && (
                    <span aria-hidden="true" className="mx-2 text-[#ff821e] print:mx-1.5">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

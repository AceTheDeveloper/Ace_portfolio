import { AceBandScroll } from "@/components/motion/AceBandScroll";
import { Crosshairs } from "@/components/ui/Crosshairs";

/**
 * Decorative wordplay between About and Projects: Ace, the IT student.
 *
 * Layout: the frame is a size container and the type is set in container
 * units, so the two words fill about 94% of the content width on one line at
 * any screen size. The margin is deliberate: if the display font fails to
 * load, the wider fallback still fits.
 *
 * Motion: as the band scrolls into view the words start apart and slide
 * together, locking when the band reaches the middle of the viewport; then the
 * underline draws. It is scroll-linked (see `.ace-band` in globals.css), with
 * AceBandScroll as the fallback for browsers without scroll-driven animations.
 */
export function AceItBand() {
  return (
    <div
      aria-hidden="true"
      className="ace-band relative overflow-hidden border-y border-line bg-wash"
    >
      <div className="bg-grid absolute inset-0" />
      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-10 md:px-8 md:py-14">
        <div className="@container relative">
          <Crosshairs />
          <p className="flex justify-center font-display text-[34cqw] font-bold leading-[0.8] tracking-[-0.05em]">
            <span className="inline-flex flex-col whitespace-nowrap">
              <span>
                <span className="ace-word-left inline-block">ACE</span>{" "}
                <span className="ace-word-right inline-block text-cobalt">
                  IT
                </span>
              </span>
              <span className="ace-rule mt-[2.5cqw] block h-[max(2px,0.4cqw)] origin-left bg-cobalt" />
            </span>
          </p>
        </div>
      </div>
      <AceBandScroll />
    </div>
  );
}

import { cacheLife } from "next/cache";
import { ArrowUp } from "lucide-react";
import { site } from "@/data/site";

/** Reading the clock is only allowed inside a cached scope when Cache Components is on. */
async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 px-5 py-8 md:px-8">
        <p className="font-mono text-xs text-muted">
          &copy; {year} {site.fullName}
        </p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-cobalt"
        >
          Back to top
          <ArrowUp className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}

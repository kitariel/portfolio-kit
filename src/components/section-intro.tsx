import {Reveal} from '@/components/reveal';

interface SectionIntroProps {
  index: string;
  label: string;
  title: string;
  intro?: string;
  headingId: string;
}

/** Section masthead: numbered mono label, display heading, optional standfirst. */
export function SectionIntro({index, label, title, intro, headingId}: SectionIntroProps) {
  return (
    <Reveal className="rule-t pt-5">
      <p className="label text-muted flex items-center gap-3">
        <span>{index}</span>
        <span aria-hidden="true">—</span>
        <span>{label}</span>
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-10">
        <h2 id={headingId} className="display-lg reveal-mask lg:col-span-7">
          <span className="reveal-line">{title}</span>
        </h2>
        {intro && (
          <p
            className="prose-quiet reveal-fade lg:col-span-5 lg:justify-self-end"
            style={{transitionDelay: '120ms'}}
          >
            {intro}
          </p>
        )}
      </div>
    </Reveal>
  );
}

import { getWeeklyPicks } from '@/lib/projects';
import FeaturedCard from '@/components/cards/FeaturedCard';
import SectionTitle from '@/components/shared/SectionTitle';

export default function WeeklyPicks() {
  const picks = getWeeklyPicks();

  if (picks.length === 0) {
    return (
      <section className="px-4 py-8">
        <div className="mx-auto max-w-[900px]">
          <SectionTitle title="🔥 本周精选" subtitle="本周暂无精选项目，请稍后再来" />
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-[900px]">
        <SectionTitle
          title="🔥 本周精选"
          subtitle="本周最值得关注的3个赚钱机会"
        />

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {picks.map(({ project, editorNote }) => (
            <FeaturedCard
              key={project.slug}
              project={project}
              editorNote={editorNote}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { getCategories, getNonAcademicProjects } from '@/lib/projects';
import CategoryCard from '@/components/cards/CategoryCard';
import SectionTitle from '@/components/shared/SectionTitle';
import type { DisplayCategory } from '@/lib/types';

export default function CategoryEntry() {
  const categories = getCategories().filter((c) => c.key !== 'academic');
  const projects = getNonAcademicProjects();

  const counts: Record<DisplayCategory, number> = {
    'can-earn': 0,
    'need-modify': 0,
    'learn-reference': 0,
    academic: 0,
  };
  projects.forEach((p) => {
    counts[p.displayCategory]++;
  });

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-[900px]">
        <SectionTitle
          title="📂 按类型浏览"
          subtitle="按'对你有什么用'分类，找到适合你的项目"
        />

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.key}
              category={cat}
              projectCount={counts[cat.key] ?? 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

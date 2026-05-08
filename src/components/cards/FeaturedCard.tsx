import Link from 'next/link';
import type { Project } from '@/lib/types';
import CategoryBadge from '@/components/badges/CategoryBadge';
import OpportunityBadges from '@/components/badges/OpportunityBadge';
import StarRating from '@/components/shared/StarRating';
import { formatStars } from '@/lib/utils';

export default function FeaturedCard({
  project,
  editorNote,
}: {
  project: Project;
  editorNote: string;
}) {
  return (
    <Link
      href={`/deep-dive/${project.slug}`}
      className="group block rounded-2xl border border-black/5 bg-white p-5 no-underline shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
    >
      <div className="mb-3 flex items-center gap-2">
        <CategoryBadge category={project.displayCategory} size="sm" />
        <StarRating count={project.intelligenceLevel} size="sm" />
      </div>

      <h3 className="text-lg font-semibold text-[#171717]">{project.repo}</h3>

      <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-[#404040]">
        {project.oneLiner || project.description}
      </p>

      <div className="mt-3">
        <OpportunityBadges project={project} />
      </div>

      {editorNote && (
        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800">
          💡 {editorNote}
        </p>
      )}

      <div className="mt-3 flex items-center gap-3 text-xs text-[#8a8a8a]">
        <span>⭐ {formatStars(project.stars)}</span>
        {project.language && <span>📐 {project.language}</span>}
        {project.license && <span>📄 {project.license}</span>}
      </div>
    </Link>
  );
}

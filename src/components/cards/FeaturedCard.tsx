import Link from 'next/link';
import type { Project } from '@/lib/types';
import CategoryBadge from '@/components/badges/CategoryBadge';
import StarRating from '@/components/shared/StarRating';
import { formatStars } from '@/lib/utils';

export default function FeaturedCard({
  project,
  editorNote,
}: {
  project: Project;
  editorNote: string;
}) {
  const card = project.quickCard;

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
        {card?.一句话结论 || project.oneLiner || project.description}
      </p>

      {/* 快速判断卡摘要 — 精选卡片缩略版 */}
      {card && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className={
            card.可行性总评?.startsWith('🟢') ? 'inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-800' :
            card.可行性总评?.startsWith('🟡') ? 'inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-[11px] font-medium text-yellow-800' :
            card.可行性总评?.startsWith('🔴') ? 'inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-medium text-red-800' :
            'inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600'
          }>
            {card.可行性总评}
          </span>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] text-blue-700">
            {card.推荐产品形态}
          </span>
          <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[11px] text-amber-700">
            {card.预估投入}
          </span>
        </div>
      )}

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

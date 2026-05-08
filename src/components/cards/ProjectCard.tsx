import Link from 'next/link';
import type { Project } from '@/lib/types';
import CategoryBadge from '@/components/badges/CategoryBadge';
import LevelBadge from '@/components/badges/LevelBadge';
import OpportunityBadges from '@/components/badges/OpportunityBadge';
import { formatStars, timeAgo } from '@/lib/utils';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="mb-3 flex items-center gap-2">
        <CategoryBadge category={project.displayCategory} size="sm" />
        <LevelBadge level={project.intelligenceLevel} size="sm" />
      </div>

      <h3 className="text-lg font-semibold text-[#171717]">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline hover:text-[#2563eb]"
        >
          📌 {project.repo}
        </a>
      </h3>

      <p className="mt-2 text-[15px] leading-relaxed text-[#404040]">
        {project.oneLiner || project.description}
      </p>

      {project.monetizationPaths.length > 0 && (
        <div className="mt-2">
          <p className="text-xs text-[#8a8a8a]">🎯 你能做什么：</p>
          <ul className="mt-1 space-y-0.5 pl-0 text-sm text-[#404040]">
            {project.monetizationPaths.slice(0, 2).map((path, i) => (
              <li key={i} className="list-inside list-disc text-xs">
                {path}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-3">
        <OpportunityBadges project={project} />
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-3">
        <div className="flex items-center gap-3 text-xs text-[#8a8a8a]">
          <span>⭐ {formatStars(project.stars)}</span>
          {project.language && <span>📐 {project.language}</span>}
          {project.license && <span>📄 {project.license}</span>}
          {project.createdAt && <span>🕐 {timeAgo(project.createdAt)}</span>}
        </div>
        <Link
          href={`/deep-dive/${project.slug}`}
          className="text-xs font-medium text-[#2563eb] no-underline hover:underline"
        >
          深度拆解 ↓
        </Link>
      </div>
    </div>
  );
}

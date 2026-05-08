import type { Project } from '@/lib/types';
import CategoryBadge from '@/components/badges/CategoryBadge';
import LevelBadge from '@/components/badges/LevelBadge';
import { formatStars, timeAgo } from '@/lib/utils';

export default function MustRead({ project }: { project: Project }) {
  return (
    <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <CategoryBadge category={project.displayCategory} />
        <LevelBadge level={project.intelligenceLevel} />
      </div>

      <h1 className="text-2xl font-bold text-[#171717] sm:text-3xl">
        {project.repo}
      </h1>

      <p className="mt-2 text-lg leading-relaxed text-[#404040]">
        {project.oneLiner || project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#8a8a8a]">
        <span>⭐ {formatStars(project.stars)} Stars</span>
        {project.language && <span>📐 {project.language}</span>}
        {project.license && <span>📄 {project.license}</span>}
        {project.updatedAt && <span>📅 更新于 {timeAgo(project.updatedAt)}</span>}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-lg bg-[#171717] px-4 py-2 text-sm font-medium text-white no-underline transition-colors hover:bg-[#404040]"
        >
          GitHub →
        </a>
        {project.homepage && (
          <a
            href={project.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm text-[#404040] no-underline transition-colors hover:bg-[#f5f5f4]"
          >
            官网 →
          </a>
        )}
      </div>

      <div className="mt-5 rounded-xl bg-[#fafaf9] p-4">
        <h2 className="text-sm font-semibold text-[#171717]">💬 这是什么？</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[#404040]">
          {project.description || '暂无详细描述'}
        </p>
        {project.corePainPoint && project.corePainPoint.length > 3 && (
          <div className="mt-3">
            <h3 className="text-sm font-semibold text-[#171717]">痛点：</h3>
            <p className="mt-1 text-[15px] text-[#404040]">{project.corePainPoint}</p>
          </div>
        )}

        {project.deepDive?.大白话 && (
          <div className="mt-3 rounded-lg bg-blue-50 p-3">
            <h3 className="text-sm font-semibold text-[#2563eb]">💡 大白话解释</h3>
            <p className="mt-1 text-[15px] leading-relaxed text-[#404040]">
              {project.deepDive.大白话}
            </p>
          </div>
        )}
      </div>

      {project.useCases && project.useCases.length > 0 && (
        <div className="mt-5 rounded-xl bg-[#fafaf9] p-4">
          <h2 className="text-sm font-semibold text-[#171717]">📋 使用案例</h2>
          <div className="mt-2 space-y-3">
            {project.useCases.map((uc, i) => (
              <div key={i} className="rounded-lg bg-white p-3 border border-black/5">
                <p className="text-sm font-medium text-[#171717]">{uc.场景}：{uc.做什么}</p>
                <p className="mt-1 text-xs text-[#8a8a8a]">怎么用：{uc.怎么做}</p>
                <p className="mt-0.5 text-xs text-[#16a34a]">效果：{uc.预期效果}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

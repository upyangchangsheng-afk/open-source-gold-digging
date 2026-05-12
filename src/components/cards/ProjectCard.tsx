import Link from 'next/link';
import type { Project } from '@/lib/types';
import CategoryBadge from '@/components/badges/CategoryBadge';
import LevelBadge from '@/components/badges/LevelBadge';
import { formatStars, timeAgo } from '@/lib/utils';

function FeasibilityBadge({ rating }: { rating: string }) {
  if (!rating) return null;
  const isGreen = rating.startsWith('🟢');
  const isYellow = rating.startsWith('🟡');
  const isRed = rating.startsWith('🔴');
  const base = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium';
  if (isGreen) return <span className={`${base} bg-green-100 text-green-800`}>{rating}</span>;
  if (isYellow) return <span className={`${base} bg-yellow-100 text-yellow-800`}>{rating}</span>;
  if (isRed) return <span className={`${base} bg-red-100 text-red-800`}>{rating}</span>;
  return <span className={`${base} bg-gray-100 text-gray-600`}>{rating}</span>;
}

function SourceBadge({ source }: { source: string }) {
  const map: Record<string, { label: string; color: string }> = {
    hn: { label: 'HN', color: 'bg-orange-50 text-orange-700' },
    devto: { label: 'Dev.to', color: 'bg-purple-50 text-purple-700' },
    indiehackers: { label: 'IH', color: 'bg-cyan-50 text-cyan-700' },
    youtube: { label: 'YT', color: 'bg-red-50 text-red-700' },
    external_ref: { label: '社区推荐', color: 'bg-amber-50 text-amber-700' },
  };
  const info = map[source];
  if (!info) return null;
  return (
    <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[11px] font-medium ${info.color}`}>
      {info.label}
    </span>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const card = project.quickCard;
  const isGitHub = !['hn', 'devto', 'indiehackers', 'youtube'].includes(project.source || '');

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="mb-3 flex items-center gap-2">
        <CategoryBadge category={project.displayCategory} size="sm" />
        <LevelBadge level={project.intelligenceLevel} size="sm" />
        <SourceBadge source={project.source || ''} />
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

      {/* 快速判断卡 — LLM 商业分析 */}
      {card ? (
        <div className="mt-3 rounded-xl border border-black/5 bg-gradient-to-br from-[#fafaf9] to-white p-3">
          <div className="flex items-center gap-2 mb-2">
            <FeasibilityBadge rating={card.可行性总评} />
            {card.可信度 && (() => {
              const c = card.可信度;
              const color = c.startsWith('🟢') ? 'bg-green-50 text-green-700' :
                c.startsWith('🟡') ? 'bg-yellow-50 text-yellow-700' :
                c.startsWith('🔴') ? 'bg-red-50 text-red-700' :
                'bg-gray-50 text-gray-600';
              return (
                <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[11px] font-medium ${color}`}>
                  {c}
                </span>
              );
            })()}
          </div>
          {card.核心卖点 && (
            <p className="text-xs font-medium text-[#404040] mb-2 leading-relaxed">
              {card.核心卖点}
            </p>
          )}
          <div className="grid grid-cols-1 gap-1.5 text-xs border-t border-black/5 pt-2">
            <div className="flex items-baseline gap-1">
              <span className="text-[#8a8a8a] shrink-0">产品形态：</span>
              <span className="text-[#404040] font-medium">{card.推荐产品形态}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[#8a8a8a] shrink-0">目标用户：</span>
              <span className="text-[#404040]">{card.目标用户}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[#8a8a8a] shrink-0">预估投入：</span>
              <span className="text-[#404040] font-medium">{card.预估投入}</span>
            </div>
          </div>
        </div>
      ) : (
        /* 降级：无 LLM 数据时显示模板 monetizationPaths */
        project.monetizationPaths.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-[#8a8a8a]">🎯 你能做什么：</p>
            <ul className="mt-1 space-y-0.5 pl-0 text-sm text-[#404040]">
              {project.monetizationPaths.slice(0, 2).map((path, i) => (
                <li key={i} className="list-inside list-disc text-xs">{path}</li>
              ))}
            </ul>
          </div>
        )
      )}

      <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-3">
        <div className="flex items-center gap-3 text-xs text-[#8a8a8a]">
          <span>⭐ {formatStars(project.stars)}</span>
          {isGitHub && project.language && <span>📐 {project.language}</span>}
          {isGitHub && project.license && <span>📄 {project.license}</span>}
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

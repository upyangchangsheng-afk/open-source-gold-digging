import type { Project, QuickCard } from '@/lib/types';
import CategoryBadge from '@/components/badges/CategoryBadge';
import LevelBadge from '@/components/badges/LevelBadge';
import { formatStars, timeAgo } from '@/lib/utils';

function ConfidenceBadge({ level }: { level?: string }) {
  if (!level) return null;
  const colors: Record<string, string> = {
    '🟢高': 'bg-green-50 text-green-700 border-green-200',
    '🟡中': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    '🔴低': 'bg-red-50 text-red-700 border-red-200',
  };
  const color = colors[level] || 'bg-gray-50 text-gray-500 border-gray-200';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${color}`}>
      可信度 {level}
    </span>
  );
}

function FeasibilityBadge({ rating }: { rating?: string }) {
  if (!rating) return null;
  const isGreen = rating.startsWith('🟢');
  const isYellow = rating.startsWith('🟡');
  const isRed = rating.startsWith('🔴');
  const base = 'inline-flex items-center rounded-full px-3 py-1 text-sm font-bold';
  if (isGreen) return <span className={`${base} bg-green-100 text-green-800`}>{rating}</span>;
  if (isYellow) return <span className={`${base} bg-yellow-100 text-yellow-800`}>{rating}</span>;
  if (isRed) return <span className={`${base} bg-red-100 text-red-800`}>{rating}</span>;
  return <span className={`${base} bg-gray-100 text-gray-600`}>{rating}</span>;
}

export default function QuickCard({ project }: { project: Project }) {
  const card = project.quickCard ?? undefined;

  return (
    <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:p-6">
      {/* Header */}
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

      {/* Quick Judgment Card */}
      {card ? (
        <div className="mt-5 rounded-xl border border-black/5 bg-gradient-to-br from-[#fafaf9] to-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="text-base font-bold text-[#171717]">🔍 快速判断</h2>
            <div className="flex items-center gap-3">
              <ConfidenceBadge level={card.可信度} />
              <FeasibilityBadge rating={card.可行性总评} />
            </div>
          </div>

          {/* 一句话结论 */}
          <p className="text-lg font-semibold text-[#171717] leading-snug">
            {card.一句话结论}
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-white border border-black/5 p-3">
              <span className="text-xs font-medium text-[#8a8a8a]">推荐产品形态</span>
              <p className="mt-1 text-sm text-[#404040] leading-relaxed">{card.推荐产品形态}</p>
            </div>
            <div className="rounded-lg bg-white border border-black/5 p-3">
              <span className="text-xs font-medium text-[#8a8a8a]">目标用户</span>
              <p className="mt-1 text-sm text-[#404040] leading-relaxed">{card.目标用户}</p>
            </div>
            <div className="rounded-lg bg-white border border-black/5 p-3">
              <span className="text-xs font-medium text-[#8a8a8a]">预估投入</span>
              <p className="mt-1 text-sm text-[#404040] font-medium">{card.预估投入}</p>
            </div>
            <div className="rounded-lg bg-white border border-black/5 p-3">
              <span className="text-xs font-medium text-[#8a8a8a]">核心卖点</span>
              <p className="mt-1 text-sm text-[#404040] leading-relaxed">{card.核心卖点}</p>
            </div>
          </div>

          <p className="mt-3 text-xs text-[#8a8a8a]">
            🤖 AI 生成 · 仅供参考 · 具体决策请结合实际情况判断
          </p>
        </div>
      ) : (
        /* Fallback: no LLM quick card — show description and old deepDive */
        <div className="mt-5 rounded-xl bg-[#fafaf9] p-4">
          <h2 className="text-sm font-semibold text-[#171717]">💬 这是什么？</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-[#404040]">
            {project.description || '暂无详细描述'}
          </p>
          {project.deepDive?.大白话 && (
            <div className="mt-3 rounded-lg bg-blue-50 p-3">
              <h3 className="text-sm font-semibold text-[#2563eb]">💡 大白话解释</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-[#404040]">
                {project.deepDive.大白话}
              </p>
            </div>
          )}
          <p className="mt-3 text-xs text-[#8a8a8a]">
            ⚠️ LLM 深度分析暂不可用（需配置 DEEPSEEK_API_KEY）· 当前显示项目基本信息
          </p>
        </div>
      )}

      {/* Use cases */}
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

import Link from 'next/link';
import type { Scene } from '@/lib/types';
import { getProjectBySlug } from '@/lib/projects';
import DataFreshnessBadge from '@/components/badges/DataFreshnessBadge';
import ConfidenceBadge from '@/components/badges/ConfidenceBadge';
import ToolCard from './ToolCard';
import CompetitorCard from './CompetitorCard';
import LearningPathSteps from './LearningPathSteps';
import ResourceList from './ResourceList';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-black/5 bg-white p-6">
      <h2 className="mb-4 text-lg font-bold text-[#171717]">{title}</h2>
      {children}
    </section>
  );
}

export default function SceneDetail({ scene }: { scene: Scene }) {
  return (
    <article className="mx-auto max-w-[800px] px-4 py-8 space-y-6">
      {/* ---- 头部信息 ---- */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {scene.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#f5f5f4] px-2.5 py-0.5 text-xs text-[#8a8a8a]">
              {tag}
            </span>
          ))}
          <div className="flex items-center gap-1.5 ml-auto">
            <ConfidenceBadge level={scene.dataConfidence} />
            <DataFreshnessBadge lastUpdated={scene.lastUpdated} />
          </div>
        </div>
        <h1 className="text-[28px] font-bold leading-tight text-[#171717] sm:text-3xl">
          {scene.name}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-[#404040]">
          {scene.oneLiner}
        </p>
      </div>

      {/* ---- 1. 痛点 ---- */}
      <Section title="🤔 解决什么痛点">
        <ul className="space-y-2">
          {scene.painPoints.map((p, i) => (
            <li key={i} className="flex gap-2 text-[#404040]">
              <span className="mt-0.5 shrink-0 text-[#2563eb]">●</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---- 2. 目标用户 ---- */}
      <Section title="👤 目标用户">
        <div className="flex flex-wrap gap-2">
          {scene.targetUsers.map((u, i) => (
            <span key={i} className="rounded-full bg-[#2563eb]/5 px-3 py-1.5 text-sm text-[#2563eb]">
              {u}
            </span>
          ))}
        </div>
      </Section>

      {/* ---- 3. 使用场景 ---- */}
      <Section title="📍 使用场景">
        <ul className="space-y-2">
          {scene.useScenarios.map((s, i) => (
            <li key={i} className="flex gap-2 text-[#404040]">
              <span className="mt-0.5 shrink-0 text-[#16a34a]">✓</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---- 4. 核心工具 ---- */}
      <Section title="🔧 核心工具">
        <div className="space-y-3">
          {scene.tools.map((tool, i) => (
            <ToolCard key={i} tool={tool} />
          ))}
        </div>
        {scene.toolSources.length > 0 && (
          <div className="mt-3 rounded-lg bg-[#fafaf9] p-3">
            <span className="text-xs font-medium text-[#8a8a8a]">工具来源说明</span>
            <ul className="mt-1 space-y-0.5">
              {scene.toolSources.map((src, i) => (
                <li key={i} className="text-xs text-[#404040]">{src}</li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {/* ---- 5. 竞品分析 ---- */}
      <Section title="🔍 竞品分析">
        <div className="space-y-3">
          {scene.competitors.map((comp, i) => (
            <CompetitorCard key={i} competitor={comp} />
          ))}
        </div>
      </Section>

      {/* ---- 6. 盈利渠道 ---- */}
      <Section title="💰 盈利渠道">
        <ul className="space-y-2">
          {scene.revenueChannels.map((ch, i) => (
            <li key={i} className="flex gap-2 text-[#404040]">
              <span className="mt-0.5 shrink-0 text-[#16a34a] font-bold">¥</span>
              <span>{ch}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 grid grid-cols-2 gap-3 rounded-lg bg-gradient-to-r from-[#f0fdf4] to-[#eff6ff] p-4">
          <div>
            <span className="text-xs text-[#8a8a8a]">预估月收入</span>
            <p className="text-lg font-bold text-[#16a34a]">{scene.estimatedIncome}</p>
          </div>
          <div>
            <span className="text-xs text-[#8a8a8a]">回本周期</span>
            <p className="text-lg font-bold text-[#2563eb]">{scene.paybackPeriod}</p>
          </div>
        </div>
      </Section>

      {/* ---- 7. 启动门槛与成本 ---- */}
      <Section title="🚪 启动门槛与成本">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-[#fafaf9] p-3">
            <span className="text-xs text-[#8a8a8a]">技术门槛</span>
            <p className="mt-1 font-medium text-[#171717]">{scene.techBarrier}</p>
          </div>
          <div className="rounded-lg bg-[#fafaf9] p-3">
            <span className="text-xs text-[#8a8a8a]">非技术门槛</span>
            <p className="mt-1 font-medium text-[#171717]">{scene.entryBarrier}</p>
          </div>
          <div className="rounded-lg bg-[#fafaf9] p-3">
            <span className="text-xs text-[#8a8a8a]">搭建时间</span>
            <p className="mt-1 font-medium text-[#171717]">{scene.setupTime}</p>
          </div>
          <div className="rounded-lg bg-[#fafaf9] p-3">
            <span className="text-xs text-[#8a8a8a]">启动成本</span>
            <p className="mt-1 font-medium text-[#171717]">{scene.startupCost}</p>
          </div>
        </div>
        <div className="mt-3 rounded-lg bg-[#fafaf9] p-3">
          <span className="text-xs text-[#8a8a8a]">时间投入</span>
          <p className="mt-1 font-medium text-[#171717]">{scene.timeInvestment}</p>
        </div>
      </Section>

      {/* ---- 8. 成功案例 ---- */}
      <Section title="⭐ 成功案例">
        <div className="space-y-3">
          {scene.successCases.map((c, i) => (
            <div key={i} className="rounded-lg border border-black/5 bg-gradient-to-br from-[#fafaf9] to-white p-4">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-[#171717]">{c.name}</h4>
                <span className="shrink-0 rounded-full bg-[#f5f5f4] px-2 py-0.5 text-xs text-[#8a8a8a]">{c.platform}</span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-[#8a8a8a]">收入：</span>
                  <span className="font-medium text-[#16a34a]">{c.incomeRange}</span>
                </div>
                <div>
                  <span className="text-[#8a8a8a]">运营：</span>
                  <span className="font-medium text-[#404040]">{c.operationDuration}</span>
                </div>
              </div>
              {c.sourceUrl && (
                <a
                  href={c.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs text-[#2563eb] no-underline hover:underline"
                >
                  查看信息源 ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ---- 9. 风险提示 ---- */}
      <Section title="⚠ 风险提示">
        <ul className="space-y-2">
          {scene.risks.map((r, i) => (
            <li key={i} className="flex gap-2 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800">
              <span className="shrink-0">⚠</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---- 10. 行业趋势 ---- */}
      <Section title="📈 行业趋势">
        <p className="leading-relaxed text-[#404040]">{scene.trend}</p>
      </Section>

      {/* ---- 11. 推荐组合 ---- */}
      {scene.recommendedStack.length > 0 && (
        <Section title="🧩 推荐工具组合">
          <div className="flex flex-wrap gap-2">
            {scene.recommendedStack.map((item, i) => (
              <span key={i} className="rounded-full bg-[#2563eb]/5 px-3 py-1.5 text-sm text-[#2563eb]">
                {item}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* ---- 12. 内容资源 ---- */}
      {scene.resources.length > 0 && (
        <Section title="📦 内容资源">
          <ResourceList resources={scene.resources} />
        </Section>
      )}

      {/* ---- 13. 学习路径 ---- */}
      <div id="learning-path">
        <Section title="🗺 6步学习路径">
          <LearningPathSteps steps={scene.learningPath} />
        </Section>
      </div>

      {/* ---- 14. 关联项目 ---- */}
      {scene.linkedProjectSlugs.length > 0 && (
        <Section title="🔗 关联项目">
          <div className="space-y-2">
            {scene.linkedProjectSlugs.map((slug) => {
              const project = getProjectBySlug(slug);
              if (!project) return null;
              return (
                <Link
                  key={slug}
                  href={`/deep-dive/${slug}`}
                  className="flex items-center gap-3 rounded-lg border border-black/5 bg-white p-3 no-underline hover:shadow-sm"
                >
                  <span className="text-lg">📌</span>
                  <div>
                    <p className="font-medium text-[#171717]">{project.repo}</p>
                    <p className="text-xs text-[#8a8a8a] line-clamp-1">{project.oneLiner || project.description}</p>
                  </div>
                  <span className="ml-auto text-xs text-[#2563eb]">详情 →</span>
                </Link>
              );
            })}
          </div>
        </Section>
      )}

      {/* ---- 15. CTA 行动按钮 ---- */}
      <div className="sticky bottom-4 rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] p-6 text-center shadow-lg">
        <h3 className="text-xl font-bold text-white">准备好开始了吗？</h3>
        <p className="mt-1 text-sm text-blue-100">
          按照上面的6步学习路径，今天就能迈出第一步
        </p>
        <a
          href="#learning-path"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#2563eb] no-underline hover:bg-blue-50 transition-colors"
        >
          按这个路线开始 →
        </a>
      </div>
    </article>
  );
}

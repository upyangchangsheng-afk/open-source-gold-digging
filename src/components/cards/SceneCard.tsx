import Link from 'next/link';
import type { Scene } from '@/lib/types';
import DataFreshnessBadge from '@/components/badges/DataFreshnessBadge';
import ConfidenceBadge from '@/components/badges/ConfidenceBadge';

const barrierColor: Record<string, string> = {
  '极低': 'bg-green-50 text-green-700',
  '低': 'bg-green-50 text-green-700',
  '中': 'bg-yellow-50 text-yellow-700',
  '中偏高': 'bg-orange-50 text-orange-700',
  '高': 'bg-red-50 text-red-700',
};

export default function SceneCard({ scene }: { scene: Scene }) {
  return (
    <Link
      href={`/scenes/${scene.slug}`}
      className="block rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] no-underline"
    >
      {/* 标签行 */}
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        {scene.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="inline-flex rounded-full bg-[#f5f5f4] px-2 py-0.5 text-[11px] text-[#8a8a8a]"
          >
            {tag}
          </span>
        ))}
        <div className="ml-auto flex items-center gap-1.5">
          {scene.sceneType === 'candidate' && (
            <span className="inline-flex items-center rounded-full bg-purple-50 px-1.5 py-0.5 text-[10px] text-purple-600">
              AI发现
            </span>
          )}
          {scene.sceneType === 'exploratory' && (
            <span className="inline-flex items-center rounded-full bg-gray-50 px-1.5 py-0.5 text-[10px] text-gray-500">
              探索
            </span>
          )}
          <ConfidenceBadge level={scene.dataConfidence} />
          <DataFreshnessBadge lastUpdated={scene.lastUpdated} expirationDays={scene.expirationDays} />
        </div>
      </div>

      {/* 标题 */}
      <h3 className="text-lg font-semibold text-[#171717]">
        {scene.name}
      </h3>

      {/* 一句话描述 */}
      <p className="mt-2 text-[15px] leading-relaxed text-[#404040] line-clamp-2">
        {scene.oneLiner}
      </p>

      {/* 关键指标 — 一眼判断适不适合 */}
      <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-gradient-to-br from-[#fafaf9] to-white p-3 border border-black/5">
        <div className="text-center">
          <p className="text-[11px] text-[#8a8a8a]">门槛</p>
          <p className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${barrierColor[scene.entryBarrier.split(' — ')[0]] ?? 'bg-gray-50 text-gray-600'}`}>
            {scene.entryBarrier.split(' — ')[0]}
          </p>
        </div>
        <div className="text-center">
          <p className="text-[11px] text-[#8a8a8a]">预估月收入</p>
          <p className="mt-0.5 text-sm font-semibold text-[#171717]">{scene.estimatedIncome}</p>
        </div>
        <div className="text-center">
          <p className="text-[11px] text-[#8a8a8a]">回本周期</p>
          <p className="mt-0.5 text-sm font-semibold text-[#16a34a]">{scene.paybackPeriod}</p>
        </div>
      </div>

      {/* 底部操作提示 */}
      <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-3">
        <span className="text-xs text-[#8a8a8a]">
          {scene.learningPath.length}步学习路径 · {scene.tools.length}个工具
        </span>
        <span className="text-xs font-medium text-[#2563eb]">
          查看完整路线 →
        </span>
      </div>
    </Link>
  );
}

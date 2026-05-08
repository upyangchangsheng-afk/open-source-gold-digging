'use client';

import { useState } from 'react';
import type { SixDimensions } from '@/lib/types';

export default function WorthIt({
  sixDimensions,
  monetizationPaths,
}: {
  sixDimensions: SixDimensions;
  monetizationPaths: string[];
}) {
  const [open, setOpen] = useState(false);

  const rows: Array<{ label: string; value: string; icon: string }> = [
    { label: '实现难度', value: sixDimensions.实现难度, icon: '🔧' },
    { label: '产出结果', value: sixDimensions.产出结果, icon: '📦' },
    { label: '持续性', value: sixDimensions.持续性, icon: '⏳' },
    { label: '盈利路径', value: sixDimensions.盈利路径, icon: '💰' },
    { label: '竞争烈度', value: sixDimensions.竞争烈度, icon: '⚔️' },
    { label: '风险等级', value: sixDimensions.风险等级?.join(' / ') || '未知', icon: '⚠️' },
  ];

  return (
    <section className="mt-4 rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:p-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <h2 className="text-lg font-semibold text-[#171717]">
          🎯 值不值？（深度分析）
        </h2>
        <span className="text-sm text-[#8a8a8a]">{open ? '收起 ▲' : '展开 ▼'}</span>
      </button>

      {open && (
        <div className="mt-4 space-y-4">
          {/* Six dimensions */}
          <div>
            <h3 className="text-sm font-semibold text-[#171717]">六维度评定</h3>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-2 rounded-lg bg-[#fafaf9] px-3 py-2"
                >
                  <span className="text-sm">{row.icon}</span>
                  <div className="min-w-0">
                    <span className="text-xs text-[#8a8a8a]">{row.label}</span>
                    <span className="ml-2 text-sm text-[#404040]">{row.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monetization paths */}
          {monetizationPaths.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-[#171717]">💰 变现路径</h3>
              <ul className="mt-2 space-y-1.5">
                {monetizationPaths.map((path, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-[#404040]"
                  >
                    <span className="mt-0.5 shrink-0 text-[#16a34a]">✓</span>
                    <span>{path}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Who would pay */}
          <div className="rounded-lg bg-amber-50 p-3">
            <p className="text-xs font-medium text-amber-800">
              💡 赚钱判断：基于六维度中的"盈利路径"和"竞争烈度"评估。
              {sixDimensions.盈利路径?.includes('明确') || sixDimensions.盈利路径?.includes('清晰')
                ? '该项目有明确的赚钱路径，值得关注。'
                : '该项目赚钱路径较为间接，需要更多创意和执行力。'}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

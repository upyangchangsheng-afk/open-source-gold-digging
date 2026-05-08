'use client';

import { useState } from 'react';
import type { Project } from '@/lib/types';

export default function HowToMake({
  actionSuggestions,
  hasDocker,
  hasDockerCompose,
  hasTests,
  hasCi,
  language,
  riskLevels,
  deepDive,
  techStack,
}: {
  actionSuggestions: string[];
  hasDocker: boolean;
  hasDockerCompose: boolean;
  hasTests: boolean;
  hasCi: boolean;
  language: string;
  riskLevels: string[];
  deepDive?: Project['deepDive'];
  techStack?: Project['techStack'];
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-4 rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:p-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <h2 className="text-lg font-semibold text-[#171717]">
          🚀 怎么跑起来？（需要动手）
        </h2>
        <span className="text-sm text-[#8a8a8a]">{open ? '收起 ▲' : '展开 ▼'}</span>
      </button>

      {open && (
        <div className="mt-4 space-y-4">
          {/* Deployment readiness */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <ReadyBadge label="Docker" ok={hasDocker} />
            <ReadyBadge label="Compose" ok={hasDockerCompose} />
            <ReadyBadge label="测试" ok={hasTests} />
            <ReadyBadge label="CI/CD" ok={hasCi} />
          </div>

          <div className="rounded-lg bg-[#fafaf9] p-3">
            <p className="text-sm text-[#404040]">
              <span className="font-semibold">技术栈：</span>
              {techStack ? (
                <span>
                  {techStack.主语言 && <span>🔤 {techStack.主语言} </span>}
                  {techStack.框架 && techStack.框架.length > 0 && (
                    <span>· 框架: {techStack.框架.join(', ')} </span>
                  )}
                  {techStack.AI依赖 && techStack.AI依赖.length > 0 && (
                    <span>· AI: {techStack.AI依赖.join(', ')} </span>
                  )}
                  {techStack.数据库 && techStack.数据库.length > 0 && (
                    <span>· 数据库: {techStack.数据库.join(', ')} </span>
                  )}
                  {techStack.部署方式 && techStack.部署方式.length > 0 && (
                    <span>· 部署: {techStack.部署方式.join(', ')}</span>
                  )}
                </span>
              ) : (
                <span>
                  {language || '未知语言'}
                  {hasDocker || hasDockerCompose
                    ? ' · 可容器化部署'
                    : ' · 需自行配置环境'}
                </span>
              )}
            </p>
          </div>

          {/* Action suggestions */}
          {actionSuggestions.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-[#171717]">📋 下一步行动</h3>
              <ol className="mt-2 space-y-1.5">
                {actionSuggestions.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-[#404040]"
                  >
                    <span className="mt-0.5 shrink-0 rounded-full bg-[#f59e0b] px-1.5 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* 怎么跑起来 */}
          {deepDive?.怎么跑起来 && (
            <div>
              <h3 className="text-sm font-semibold text-[#171717]">🖥️ 怎么跑起来</h3>
              <div className="mt-2 rounded-lg bg-[#fafaf9] p-3">
                <pre className="whitespace-pre-wrap text-sm text-[#404040] font-mono">
                  {deepDive.怎么跑起来}
                </pre>
              </div>
            </div>
          )}

          {/* 赚钱思路 */}
          {deepDive?.赚钱思路 && (
            <div>
              <h3 className="text-sm font-semibold text-[#16a34a]">💰 赚钱思路</h3>
              <div className="mt-2 rounded-lg bg-green-50 p-3">
                <p className="text-sm leading-relaxed text-[#404040]">
                  {deepDive.赚钱思路}
                </p>
              </div>
            </div>
          )}

          {/* Risk */}
          {riskLevels.length > 0 && riskLevels[0] !== '无显著风险' && (
            <div>
              <h3 className="text-sm font-semibold text-[#171717]">⚠️ 风险提示</h3>
              <ul className="mt-2 space-y-1">
                {riskLevels.map((risk, i) => (
                  <li key={i} className="text-sm text-[#d97706]">
                    · {risk}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {riskLevels.length === 0 ||
            (riskLevels[0] === '无显著风险' && (
              <div className="rounded-lg bg-green-50 p-3">
                <p className="text-sm text-green-700">✅ 未发现显著风险</p>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}

function ReadyBadge({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs ${
        ok
          ? 'bg-green-50 text-green-700'
          : 'bg-gray-100 text-gray-400'
      }`}
    >
      <span>{ok ? '✅' : '❌'}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
}

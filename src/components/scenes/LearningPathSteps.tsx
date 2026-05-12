'use client';

import { useState } from 'react';
import type { LearningStep } from '@/lib/types';

function StepCard({ step, isExpanded, onToggle }: { step: LearningStep; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-xl border border-black/5 bg-white">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 p-4 text-left"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-sm font-bold text-white">
          {step.step}
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-[#171717]">{step.title}</h4>
          <p className="mt-0.5 text-sm text-[#8a8a8a]">{step.action}</p>
        </div>
        <span className="shrink-0 text-sm text-[#8a8a8a]">
          {isExpanded ? '收起 ▲' : '展开 ▼'}
        </span>
      </button>

      {isExpanded && (
        <div className="border-t border-black/5 px-4 pb-4 pt-3">
          {/* 关键信息 */}
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-[#8a8a8a]">所需工具</span>
              <ul className="mt-1 space-y-0.5">
                {step.toolsNeeded.map((tool) => (
                  <li key={tool} className="font-medium text-[#404040]">{tool}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[#8a8a8a]">预期产出</span>
              <p className="mt-1 font-medium text-[#404040]">{step.expectedOutput}</p>
            </div>
            <div>
              <span className="text-[#8a8a8a]">预计耗时</span>
              <p className="mt-1 font-medium text-[#404040]">{step.timeRequired}</p>
            </div>
          </div>

          {/* 详细指引 */}
          <div className="mt-3 rounded-lg bg-[#fafaf9] p-3">
            <span className="text-xs font-medium text-[#8a8a8a]">详细指引</span>
            <p className="mt-1 text-sm leading-relaxed text-[#404040]">{step.detailedGuide}</p>
          </div>

          {/* 避坑提示 */}
          {step.pitfalls.length > 0 && (
            <div className="mt-3 rounded-lg bg-yellow-50 p-3">
              <span className="text-xs font-medium text-yellow-700">⚠ 避坑提示</span>
              <ul className="mt-1 space-y-0.5">
                {step.pitfalls.map((p, i) => (
                  <li key={i} className="text-sm text-yellow-800">{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function LearningPathSteps({ steps }: { steps: LearningStep[] }) {
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  return (
    <div className="space-y-3">
      {steps.map((step) => (
        <StepCard
          key={step.step}
          step={step}
          isExpanded={expandedStep === step.step}
          onToggle={() => setExpandedStep(expandedStep === step.step ? null : step.step)}
        />
      ))}
    </div>
  );
}

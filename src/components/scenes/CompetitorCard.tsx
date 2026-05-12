import type { CompetitorScene } from '@/lib/types';

export default function CompetitorCard({ competitor }: { competitor: CompetitorScene }) {
  return (
    <div className="rounded-xl border border-black/5 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-semibold text-[#171717]">{competitor.name}</h4>
        <span className="shrink-0 rounded-full bg-[#f5f5f4] px-2 py-0.5 text-xs text-[#8a8a8a]">
          {competitor.productForm}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-[#8a8a8a]">定价：</span>
          <span className="text-[#404040] font-medium">{competitor.pricing}</span>
        </div>
        <div>
          <span className="text-[#8a8a8a]">预估月收入：</span>
          <span className="text-[#404040] font-medium">{competitor.estimatedMonthly}</span>
        </div>
        <div>
          <span className="text-[#8a8a8a]">获客方式：</span>
          <span className="text-[#404040]">{competitor.acquisition}</span>
        </div>
      </div>

      <div className="mt-3 space-y-1.5 border-t border-black/5 pt-3">
        <div className="flex gap-2 text-sm">
          <span className="shrink-0 text-[#16a34a] font-medium">可借鉴：</span>
          <span className="text-[#404040]">{competitor.learnFrom}</span>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="shrink-0 text-[#2563eb] font-medium">差异化：</span>
          <span className="text-[#404040]">{competitor.differentiationGap}</span>
        </div>
      </div>
    </div>
  );
}

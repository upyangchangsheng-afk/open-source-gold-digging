'use client';

import { getCategories } from '@/lib/projects';
import { SORT_OPTIONS, type FilterState, type SortOption } from '@/lib/types';

const sortLabels: Record<SortOption, string> = {
  stars: '⭐ 最多Star',
  newest: '🆕 最新',
  level: '🔥 情报等级',
};

export default function FilterBar({
  currentFilter,
  onChange,
  projectCount,
}: {
  currentFilter: FilterState;
  onChange: (f: FilterState) => void;
  projectCount: number;
}) {
  const categories = getCategories();

  return (
    <div className="sticky top-[53px] z-40 border-b border-black/5 bg-[#fafaf9]/90 py-3 backdrop-blur">
      <div className="mx-auto max-w-[900px] px-4">
        {/* Category filter — horizontal scroll on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap">
          <button
            onClick={() => onChange({ ...currentFilter, category: null })}
            className={`shrink-0 rounded-full px-3 py-1.5 text-sm transition-colors ${
              !currentFilter.category
                ? 'bg-[#171717] text-white'
                : 'border border-black/10 bg-white text-[#404040]'
            }`}
          >
            全部 ({projectCount})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() =>
                onChange({ ...currentFilter, category: cat.key })
              }
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm transition-colors ${
                currentFilter.category === cat.key
                  ? 'bg-[#171717] text-white'
                  : 'border border-black/10 bg-white text-[#404040]'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="mt-2 flex items-center gap-2 text-xs text-[#8a8a8a]">
          <span>排序：</span>
          {SORT_OPTIONS.map((key) => (
            <button
              key={key}
              onClick={() => onChange({ ...currentFilter, sortBy: key })}
              className={`rounded-full px-2 py-1 transition-colors ${
                currentFilter.sortBy === key
                  ? 'text-[#2563eb] font-medium'
                  : 'text-[#8a8a8a]'
              }`}
            >
              {sortLabels[key]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import type { DisplayCategory } from '@/lib/types';

const styles: Record<DisplayCategory, string> = {
  'can-earn':
    'bg-[#16a34a] text-white font-semibold',
  'need-modify':
    'border border-[#d97706] text-[#d97706]',
  'learn-reference':
    'border border-[#2563eb] text-[#2563eb]',
  academic:
    'text-[#8a8a8a]',
};

const labels: Record<DisplayCategory, string> = {
  'can-earn': '💰 可以赚钱',
  'need-modify': '🔧 改改用',
  'learn-reference': '📖 学习参考',
  academic: '🔬 学术论文',
};

export default function CategoryBadge({
  category,
  size = 'md',
}: {
  category: DisplayCategory;
  size?: 'sm' | 'md';
}) {
  const sizeClass = size === 'sm' ? 'text-xs px-1.5 py-0.5' : 'text-sm px-2 py-0.5';

  return (
    <span
      className={`inline-block rounded-full ${sizeClass} ${styles[category]}`}
    >
      {labels[category]}
    </span>
  );
}

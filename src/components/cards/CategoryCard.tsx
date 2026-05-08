import Link from 'next/link';
import type { Category } from '@/lib/types';

export default function CategoryCard({
  category,
  projectCount,
}: {
  category: Category;
  projectCount: number;
}) {
  return (
    <Link
      href={`/discover?category=${category.key}`}
      className="flex items-center gap-3 rounded-xl border border-black/5 bg-white px-4 py-4 no-underline shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] active:scale-[0.98]"
    >
      <span className="text-2xl">{category.icon}</span>
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-semibold text-[#171717]">{category.label}</div>
        <div className="text-xs text-[#8a8a8a]">
          {category.description} · {projectCount} 个项目
        </div>
      </div>
      <span className="text-sm text-[#8a8a8a]">→</span>
    </Link>
  );
}

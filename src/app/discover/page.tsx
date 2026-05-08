'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { filterProjects, getAcademicProjects, getNonAcademicProjects } from '@/lib/projects';
import { isValidDisplayCategory, type FilterState } from '@/lib/types';
import ProjectCard from '@/components/cards/ProjectCard';
import FilterBar from '@/components/filters/FilterBar';
import SectionTitle from '@/components/shared/SectionTitle';

function DiscoverContent() {
  const searchParams = useSearchParams();
  const raw = searchParams.get('category');
  const initialCategory = raw && isValidDisplayCategory(raw) ? raw : null;

  const [filter, setFilter] = useState<FilterState>({
    category: initialCategory,
    sortBy: 'stars',
  });

  const nonAcademic = useMemo(() => getNonAcademicProjects(), []);
  const academic = useMemo(() => getAcademicProjects(), []);

  const filtered = useMemo(() => filterProjects(filter), [filter]);

  const [showAcademic, setShowAcademic] = useState(false);

  return (
    <>
      <div className="mx-auto max-w-[900px] px-4 pt-8">
        <SectionTitle title="🔍 发现项目" subtitle="按'对你有什么用'分类浏览" />
      </div>

      <FilterBar
        currentFilter={filter}
        onChange={setFilter}
        projectCount={nonAcademic.length}
      />

      <div className="mx-auto max-w-[900px] px-4 pt-6">
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-[#8a8a8a]">该分类下暂无项目</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}

        {academic.length > 0 && (
          <div className="mt-8 border-t border-black/5 pt-6">
            <button
              onClick={() => setShowAcademic(!showAcademic)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="text-lg font-semibold text-[#8a8a8a]">
                🔬 学术论文 ({academic.length})
              </span>
              <span className="text-sm text-[#8a8a8a]">
                {showAcademic ? '收起 ▲' : '展开 ▼'}
              </span>
            </button>
            {showAcademic && (
              <div className="mt-4 grid grid-cols-1 gap-4">
                {academic.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default function DiscoverPage() {
  return (
    <div className="pb-12">
      <Suspense
        fallback={
          <div className="mx-auto max-w-[900px] px-4 pt-12 text-center text-[#8a8a8a]">
            加载中...
          </div>
        }
      >
        <DiscoverContent />
      </Suspense>
    </div>
  );
}

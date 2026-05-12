import { getAllScenes, getAllTags, sortScenes } from '@/lib/scenes';
import type { SceneSortOption } from '@/lib/types';
import SceneCard from '@/components/cards/SceneCard';
import SectionTitle from '@/components/shared/SectionTitle';

interface SceneFlowProps {
  sortBy?: SceneSortOption;
  filterTag?: string;
}

export default function SceneFlow({ sortBy = 'default', filterTag }: SceneFlowProps) {
  let scenes = getAllScenes();

  if (filterTag) {
    scenes = scenes.filter((s) => s.tags.includes(filterTag));
  }

  scenes = sortScenes(scenes, sortBy);
  const allTags = getAllTags();

  if (scenes.length === 0) {
    return (
      <section className="px-4 py-8">
        <div className="mx-auto max-w-[900px]">
          <SectionTitle
            title="🎯 发现商业场景"
            subtitle="从真实市场出发，找到适合你的AI小生意"
          />
          <div className="mt-6 rounded-2xl border border-dashed border-black/10 bg-white p-12 text-center">
            <p className="text-[#8a8a8a]">更多场景挖掘中，敬请期待</p>
            <p className="mt-2 text-sm text-[#8a8a8a]">
              我们正在基于真实市场数据调研新场景，如果你有想了解的方向，欢迎反馈
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-[900px]">
        <SectionTitle
          title="🎯 发现商业场景"
          subtitle="不只告诉你'能赚钱'，更给你完整的行动路线图"
        />

        {/* 标签过滤条 */}
        {allTags.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex cursor-default rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  filterTag === tag
                    ? 'bg-[#2563eb] text-white'
                    : 'bg-[#f5f5f4] text-[#8a8a8a]'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 场景卡片流 */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {scenes.map((scene) => (
            <SceneCard key={scene.slug} scene={scene} />
          ))}
        </div>
      </div>
    </section>
  );
}

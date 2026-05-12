'use client';

import { useState } from 'react';
import { getAllScenes, getAllTags, sortScenes, getDeepScenes, getCandidateScenes } from '@/lib/scenes';
import type { Scene, SceneSortOption } from '@/lib/types';
import SceneCard from '@/components/cards/SceneCard';
import SectionTitle from '@/components/shared/SectionTitle';

interface SceneFlowProps {
  sortBy?: SceneSortOption;
}

type TierFilter = 'all' | 'deep' | 'candidate';

export default function SceneFlow({ sortBy = 'default' }: SceneFlowProps) {
  const [tier, setTier] = useState<TierFilter>('all');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  let scenes: Scene[];
  if (tier === 'deep') {
    scenes = getDeepScenes();
  } else if (tier === 'candidate') {
    scenes = getCandidateScenes();
  } else {
    scenes = getAllScenes();
  }

  if (activeTag) {
    scenes = scenes.filter((s) => s.tags.includes(activeTag));
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

        {/* 分级 + 标签过滤条 */}
        <div className="mt-4 flex flex-wrap gap-2">
          {(['all', 'deep', 'candidate'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setTier(t); setActiveTag(null); }}
              className={`inline-flex cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                tier === t && !activeTag
                  ? 'bg-[#2563eb] text-white'
                  : t === 'candidate'
                    ? 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                    : 'bg-[#f5f5f4] text-[#8a8a8a] hover:bg-[#e5e5e2]'
              }`}
            >
              {t === 'all' ? '全部' : t === 'deep' ? '深度验证' : 'AI发现'}
            </button>
          ))}
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => { setActiveTag(activeTag === tag ? null : tag); setTier('all'); }}
              className={`inline-flex cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeTag === tag
                  ? 'bg-[#2563eb] text-white'
                  : 'bg-[#f5f5f4] text-[#8a8a8a] hover:bg-[#e5e5e2]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

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

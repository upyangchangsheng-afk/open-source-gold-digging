import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllScenes, getSceneBySlug } from '@/lib/scenes';
import SceneDetail from '@/components/scenes/SceneDetail';
import Link from 'next/link';

export async function generateStaticParams() {
  const scenes = getAllScenes();
  return scenes.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const scene = getSceneBySlug(slug);
  if (!scene) return { title: '场景未找到' };
  return {
    title: `${scene.name} — 商业场景分析`,
    description: scene.oneLiner,
  };
}

export default async function ScenePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scene = getSceneBySlug(slug);
  if (!scene) notFound();

  return (
    <div className="pb-12">
      <div className="mx-auto max-w-[800px] px-4 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[#8a8a8a] no-underline hover:text-[#404040]"
        >
          ← 返回首页
        </Link>
      </div>

      <SceneDetail scene={scene} />

      <div className="mx-auto mt-8 max-w-[800px] px-4">
        <div className="flex justify-between border-t border-black/5 pt-4">
          <Link
            href="/"
            className="text-sm text-[#2563eb] no-underline hover:underline"
          >
            ← 浏览更多场景
          </Link>
          <Link
            href="/discover"
            className="text-sm text-[#2563eb] no-underline hover:underline"
          >
            查看项目库 →
          </Link>
        </div>
      </div>
    </div>
  );
}

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { getScenesByProjectSlug } from '@/lib/scenes';
import QuickCard from '@/components/deep-dive/QuickCard';
import FullReport from '@/components/deep-dive/FullReport';
import Link from 'next/link';

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: '未找到' };
  return {
    title: `${project.repo} — 商业可行性报告`,
    description: project.oneLiner || project.description,
  };
}

export default async function DeepDivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="pb-12">
      <div className="mx-auto max-w-[900px] px-4 pt-6">
        <Link
          href="/discover"
          className="inline-flex items-center gap-1 text-sm text-[#8a8a8a] no-underline hover:text-[#404040]"
        >
          ← 返回发现页
        </Link>
      </div>

      <div className="mx-auto max-w-[900px] px-4 pt-4">
        <QuickCard project={project} />
        <FullReport
          report={project.fullReport}
          quickCard={project.quickCard}
        />
      </div>

      {/* 反向场景关联 */}
      <div className="mx-auto mt-8 max-w-[900px] px-4">
        <RelatedScenes projectSlug={slug} />
      </div>

      {/* Prev/Next navigation */}
      <div className="mx-auto mt-8 max-w-[900px] px-4">
        <div className="flex justify-between border-t border-black/5 pt-4">
          <Link
            href="/discover"
            className="text-sm text-[#2563eb] no-underline hover:underline"
          >
            ← 浏览更多项目
          </Link>
          <Link
            href="/"
            className="text-sm text-[#2563eb] no-underline hover:underline"
          >
            返回首页 →
          </Link>
        </div>
      </div>
    </div>
  );
}

function RelatedScenes({ projectSlug }: { projectSlug: string }) {
  const scenes = getScenesByProjectSlug(projectSlug);
  if (scenes.length === 0) return null;
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <h3 className="text-lg font-bold text-[#171717]">🎯 此工具关联的商业场景</h3>
      <p className="mt-1 text-sm text-[#8a8a8a]">以下场景推荐了此工具</p>
      <div className="mt-3 space-y-2">
        {scenes.map((scene) => (
          <Link
            key={scene.slug}
            href={`/scenes/${scene.slug}`}
            className="flex items-center gap-3 rounded-lg border border-black/5 bg-gradient-to-br from-[#fafaf9] to-white p-3 no-underline hover:shadow-sm"
          >
            <span className="text-lg">🎯</span>
            <div>
              <p className="font-medium text-[#171717]">{scene.name}</p>
              <p className="text-xs text-[#8a8a8a] line-clamp-1">{scene.oneLiner}</p>
            </div>
            <span className="ml-auto text-xs text-[#2563eb]">查看场景 →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

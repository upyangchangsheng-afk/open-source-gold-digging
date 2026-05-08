import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import MustRead from '@/components/deep-dive/MustRead';
import WorthIt from '@/components/deep-dive/WorthIt';
import HowToMake from '@/components/deep-dive/HowToMake';
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
    title: `${project.repo} — 深度拆解`,
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
        <MustRead project={project} />
        <WorthIt
          sixDimensions={project.sixDimensions}
          monetizationPaths={project.monetizationPaths}
        />
        <HowToMake
          actionSuggestions={project.actionSuggestions}
          hasDocker={project.hasDocker}
          hasDockerCompose={project.hasDockerCompose}
          hasTests={project.hasTests}
          hasCi={project.hasCi}
          language={project.language}
          riskLevels={project.sixDimensions.风险等级}
          deepDive={project.deepDive}
          techStack={project.techStack}
        />
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

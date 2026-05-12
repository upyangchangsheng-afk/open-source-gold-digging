import { getAllScenes } from '@/lib/scenes';
import Link from 'next/link';

export default function SceneProjectBridge() {
  const linkedSlugs = new Set<string>();
  getAllScenes().forEach((s) => s.linkedProjectSlugs.forEach((p) => linkedSlugs.add(p)));
  const linkedCount = linkedSlugs.size;
  if (linkedCount === 0) return null;

  return (
    <section className="px-4 py-4">
      <div className="mx-auto max-w-[900px]">
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-r from-[#eff6ff] to-[#f0fdf4] p-5 text-center sm:flex-row sm:justify-between">
          <p className="text-sm font-medium text-[#404040]">
            以上场景共关联了{' '}
            <span className="font-bold text-[#2563eb]">{linkedCount}</span>{' '}
            个开源项目，帮你从想法到落地
          </p>
          <Link
            href="/discover"
            className="shrink-0 rounded-full bg-[#2563eb] px-4 py-1.5 text-xs font-medium text-white no-underline hover:bg-blue-700"
          >
            浏览项目库 →
          </Link>
        </div>
      </div>
    </section>
  );
}

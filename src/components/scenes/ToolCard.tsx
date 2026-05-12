import Link from 'next/link';
import type { ToolRef } from '@/lib/types';

export default function ToolCard({ tool }: { tool: ToolRef }) {
  return (
    <div className="rounded-xl border border-black/5 bg-gradient-to-br from-[#fafaf9] to-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-[#171717]">{tool.name}</h4>
          <p className="mt-1 text-sm text-[#404040]">{tool.usage}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          {tool.projectSlug ? (
            <Link
              href={`/deep-dive/${tool.projectSlug}`}
              className="text-xs font-medium text-[#2563eb] no-underline hover:underline"
            >
              查看项目详情 →
            </Link>
          ) : (
            <a
              href={tool.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[#2563eb] no-underline hover:underline"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>

      {tool.alternatives.length > 0 && (
        <div className="mt-2 border-t border-black/5 pt-2">
          <span className="text-[11px] text-[#8a8a8a]">替代方案：</span>
          {tool.alternatives.map((alt, i) => (
            <a
              key={i}
              href={alt}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-[11px] text-[#2563eb] no-underline hover:underline"
            >
              {alt.split('github.com/')[1] ?? `方案${i + 1}`}
              {i < tool.alternatives.length - 1 && '、'}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

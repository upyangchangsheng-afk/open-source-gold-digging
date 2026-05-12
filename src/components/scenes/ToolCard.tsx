import Link from 'next/link';
import type { ToolRef } from '@/lib/types';
import { getProjectBySlug } from '@/lib/projects';

export default function ToolCard({ tool }: { tool: ToolRef }) {
  const project = tool.projectSlug ? getProjectBySlug(tool.projectSlug) : null;

  return (
    <div className="rounded-xl border border-black/5 bg-gradient-to-br from-[#fafaf9] to-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-[#171717]">{tool.name}</h4>
          <p className="mt-1 text-sm text-[#404040]">{tool.usage}</p>
          {project && (
            <p className="mt-1 text-xs text-[#8a8a8a] line-clamp-1">
              {project.quickCard?.一句话结论 || project.oneLiner}
            </p>
          )}
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

      {project?.quickCard?.可行性总评 && (
        <div className="mt-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] text-blue-700">
          AI评估：{project.quickCard.可行性总评}
        </div>
      )}

      {tool.alternatives.length > 0 && (
        <div className="mt-2 border-t border-black/5 pt-2">
          <span className="text-[11px] text-[#8a8a8a]">替代方案：</span>
          {tool.alternatives.map((alt, i) => {
            const isUrl = alt.startsWith('http://') || alt.startsWith('https://');
            const altProject = !isUrl ? getProjectBySlug(alt) : null;
            const label = isUrl
              ? (alt.split('github.com/')[1] ?? `方案${i + 1}`)
              : (altProject?.repo ?? alt);
            const sharedClass = 'ml-1 text-[11px] text-[#2563eb] no-underline hover:underline';

            const renderItem = () => {
              if (isUrl) {
                return (
                  <a href={alt} target="_blank" rel="noopener noreferrer" className={sharedClass}>
                    {label}
                  </a>
                );
              }
              if (altProject) {
                return (
                  <Link href={`/deep-dive/${alt}`} className={sharedClass}>
                    {label}
                  </Link>
                );
              }
              return <span className="ml-1 text-[11px] text-[#8a8a8a]">{label}</span>;
            };

            return (
              <span key={i}>
                {renderItem()}
                {i < tool.alternatives.length - 1 && '、'}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

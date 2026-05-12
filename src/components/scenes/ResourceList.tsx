import type { Resource } from '@/lib/types';

const typeLabel: Record<Resource['type'], { label: string; icon: string }> = {
  template: { label: '模板', icon: '📋' },
  tutorial: { label: '教程', icon: '📖' },
  tool: { label: '工具', icon: '🔧' },
  asset: { label: '素材', icon: '🎨' },
  script: { label: '话术', icon: '💬' },
};

const costLabel: Record<Resource['cost'], string> = {
  free: '免费',
  paid: '付费',
  freemium: '部分免费',
};

export default function ResourceList({ resources }: { resources: Resource[] }) {
  return (
    <div className="space-y-2">
      {resources.map((r, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-lg border border-black/5 bg-white p-3"
        >
          <span className="mt-0.5 shrink-0 text-lg">{typeLabel[r.type].icon}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h5 className="text-sm font-semibold text-[#171717]">{r.title}</h5>
              <span className="shrink-0 rounded-full bg-[#f5f5f4] px-1.5 py-0.5 text-[11px] text-[#8a8a8a]">
                {typeLabel[r.type].label}
              </span>
              <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[11px] font-medium ${
                r.cost === 'free' ? 'bg-green-50 text-green-700' :
                r.cost === 'freemium' ? 'bg-yellow-50 text-yellow-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {costLabel[r.cost]}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[#404040]">{r.description}</p>
          </div>
          {r.url && (
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs font-medium text-[#2563eb] no-underline hover:underline"
            >
              前往 ↗
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

import Link from 'next/link';
import { site } from '@/config/site';

function formatLastUpdate(iso: string | null): string {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffH = Math.floor(diffMs / 3600000);
    const diffD = Math.floor(diffH / 24);

    const formatted = d.toLocaleString('zh-CN', {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    if (diffH < 1) return `刚刚更新 (${formatted})`;
    if (diffD < 1) return `${diffH} 小时前更新 (${formatted})`;
    if (diffD === 1) return `昨天更新 (${formatted})`;
    return `${diffD} 天前更新 (${formatted})`;
  } catch {
    return '';
  }
}

export default function Footer() {
  const lastUpdateText = formatLastUpdate(site.lastUpdate);

  return (
    <footer className="border-t border-black/5 bg-[#fafaf9]">
      <div className="mx-auto max-w-[900px] px-4 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-[#8a8a8a]">
            {site.name} · {site.tagline}
          </div>
          <div className="flex gap-4 text-sm">
            <Link href="/about" className="text-[#8a8a8a] no-underline hover:text-[#404040]">
              关于
            </Link>
            <Link href="/subscribe" className="text-[#8a8a8a] no-underline hover:text-[#404040]">
              订阅
            </Link>
            <Link href="/contact" className="text-[#8a8a8a] no-underline hover:text-[#404040]">
              联系
            </Link>
          </div>
        </div>
        <div className="mt-4 text-xs text-[#8a8a8a] flex flex-col sm:flex-row sm:items-center gap-2">
          <span>项目数据来自 GitHub，分析由人工 + AI 辅助完成。内容仅代表个人观点。</span>
          {lastUpdateText && (
            <span className="sm:ml-auto text-[#aaaaaa]">
              数据更新：{lastUpdateText}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}

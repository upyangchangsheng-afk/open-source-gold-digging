import Link from 'next/link';
import { site } from '@/config/site';

export default function Footer() {
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
        <div className="mt-4 text-xs text-[#8a8a8a]">
          项目数据来自 GitHub，分析由人工 + AI 辅助完成。内容仅代表个人观点。
        </div>
      </div>
    </footer>
  );
}

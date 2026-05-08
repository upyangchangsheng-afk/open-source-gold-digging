import { site } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '联系',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-12">
      <h1 className="text-2xl font-bold text-[#171717] sm:text-3xl">
        📬 联系
      </h1>

      <div className="mt-8 space-y-6">
        <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <h2 className="text-lg font-semibold text-[#171717]">想推荐项目？</h2>
          <p className="mt-2 text-sm text-[#404040]">
            发现了一个值得拆解的 AI 开源项目？欢迎推荐。
          </p>
          <ul className="mt-3 space-y-1 text-sm text-[#404040]">
            <li>→ 发邮件到 {site.social.email}</li>
            <li>
              → 或在{' '}
              <a
                href={`https://github.com/${site.social.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563eb]"
              >
                GitHub
              </a>{' '}
              提 Issue
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <h2 className="text-lg font-semibold text-[#171717]">想合作？</h2>
          <p className="mt-2 text-sm text-[#404040]">
            如果你有 AI 相关的产品或想法，想一起探讨。
          </p>
          <p className="mt-3 text-sm text-[#404040]">
            → 发邮件到 {site.social.email}
          </p>
        </section>

        <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <h2 className="text-lg font-semibold text-[#171717]">其他渠道</h2>
          <ul className="mt-3 space-y-1 text-sm text-[#404040]">
            <li>· 小红书：{site.social.xiaohongshu}</li>
            <li>· 抖音：{site.social.douyin}</li>
            <li>· GitHub：{site.social.github}</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

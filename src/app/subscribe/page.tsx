'use client';

import { site } from '@/config/site';

function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => navigator.clipboard?.writeText(text)}
      className="rounded-lg bg-[#171717] px-3 py-2 text-xs text-white"
    >
      复制链接
    </button>
  );
}

export default function SubscribePage() {
  const feedUrl = `${site.url}/feed.xml`;

  return (
    <div className="mx-auto max-w-[900px] px-4 py-12">
      <h1 className="text-2xl font-bold text-[#171717] sm:text-3xl">
        📧 订阅更新
      </h1>
      <p className="mt-2 text-[15px] text-[#8a8a8a]">
        不想每周一都来看？多种方式保持联系
      </p>

      <div className="mt-8 space-y-6">
        <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <h2 className="text-lg font-semibold text-[#171717]">📡 RSS 订阅</h2>
          <p className="mt-2 text-sm text-[#404040]">
            用任何 RSS 阅读器订阅，每周一更新自动推送。
          </p>
          <div className="mt-3 flex items-center gap-2">
            <code className="rounded-lg bg-[#fafaf9] px-3 py-2 text-sm text-[#404040]">
              {feedUrl}
            </code>
            <CopyButton text={feedUrl} />
          </div>
        </section>

        <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <h2 className="text-lg font-semibold text-[#171717]">📱 社交媒体</h2>
          <p className="mt-2 text-sm text-[#404040]">
            关注以下账号，每周一同步更新：
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#404040]">
            <li>· 小红书：{site.social.xiaohongshu}</li>
            <li>· 抖音：{site.social.douyin}</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <h2 className="text-lg font-semibold text-[#171717]">💌 邮件订阅</h2>
          <div className="mt-2 rounded-lg border border-dashed border-black/10 bg-[#fafaf9] p-4 text-center">
            <p className="text-sm text-[#8a8a8a]">即将推出</p>
            <p className="mt-1 text-xs text-[#8a8a8a]">
              留下邮箱，每周一早上收到本周精选
            </p>
            <div className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                disabled
                className="flex-1 rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-[#8a8a8a]"
              />
              <button
                disabled
                className="rounded-lg bg-[#8a8a8a] px-4 py-2 text-sm text-white"
              >
                订阅
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <h2 className="text-lg font-semibold text-[#171717]">💬 微信群</h2>
          <div className="mt-2 rounded-lg border border-dashed border-black/10 bg-[#fafaf9] p-4 text-center">
            <p className="text-sm text-[#8a8a8a]">即将推出</p>
            <p className="mt-1 text-xs text-[#8a8a8a]">
              第3个月起开放微信群，每周讨论新项目
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

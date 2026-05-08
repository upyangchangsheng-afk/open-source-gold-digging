import { site } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-12">
      <h1 className="text-2xl font-bold text-[#171717] sm:text-3xl">
        这个网站是干嘛的？
      </h1>

      <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-[#404040] sm:text-base">
        <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <p className="text-lg">
            我是 {site.author}，{site.authorTitle}。
          </p>
          <p className="mt-4">
            每周扫描 GitHub 上的 AI 开源项目，用中文告诉你三件事：
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[#16a34a] font-bold">1.</span>
              <span><strong>能做什么产品</strong> — 不是技术描述，是你能用它做什么</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#16a34a] font-bold">2.</span>
              <span><strong>能不能赚钱</strong> — 有证据支撑，不是拍脑袋</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#16a34a] font-bold">3.</span>
              <span><strong>怎么跑起来</strong> — 具体步骤，不是空泛建议</span>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <h2 className="text-xl font-semibold text-[#171717]">我的判断方法</h2>
          <p className="mt-3">
            💰"可以赚钱"不是拍脑袋。三个硬条件：
          </p>
          <ol className="mt-3 space-y-3">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 rounded-full bg-[#16a34a] px-2 py-0.5 text-xs font-bold text-white">
                1
              </span>
              <span>
                <strong>有付费竞品</strong> — 说明市场已经存在，不需要教育用户
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 rounded-full bg-[#16a34a] px-2 py-0.5 text-xs font-bold text-white">
                2
              </span>
              <span>
                <strong>有用户痛点</strong> — 说明需求是真实的，不是臆想的
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 rounded-full bg-[#16a34a] px-2 py-0.5 text-xs font-bold text-white">
                3
              </span>
              <span>
                <strong>有变现路径</strong> — 说明逻辑通，能从用户那里收到钱
              </span>
            </li>
          </ol>
          <p className="mt-4 text-sm text-[#8a8a8a]">
            每个项目经过六层深度拆解，关键赚钱信号人工复核。
          </p>
        </section>

        <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <h2 className="text-xl font-semibold text-[#171717]">为什么做这个站？</h2>
          <p className="mt-3">
            市面上有很多"GitHub 项目推荐"，但都是技术视角——告诉你用了什么框架、什么算法。
            普通人看完还是一头雾水："这跟我有什么关系？"
          </p>
          <p className="mt-3">
            开源挖宝想做的，是站在<strong>不懂技术的人</strong>的角度，回答最核心的问题：
            这项目能帮你赚钱吗？怎么赚？
          </p>
        </section>

        <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <h2 className="text-xl font-semibold text-[#171717]">更新频率</h2>
          <p className="mt-3">
            每周一更新 3 个精选项目 + 1 篇深度拆解。
          </p>
          <p className="mt-2 text-sm text-[#8a8a8a]">
            联系我：{site.social.email}
          </p>
        </section>
      </div>
    </div>
  );
}

import { site } from '@/config/site';

export default function Hero() {
  return (
    <section className="px-4 pb-8 pt-10 sm:pt-16">
      <div className="mx-auto max-w-[900px] text-center">
        <h1 className="text-[28px] font-bold leading-tight text-[#171717] sm:text-4xl">
          {site.name}
        </h1>
        <p className="mt-3 text-lg text-[#8a8a8a] sm:text-xl">
          {site.tagline}
        </p>

        <div className="mt-6 inline-flex flex-col gap-2 rounded-2xl bg-white px-6 py-4 text-left shadow-sm sm:flex-row sm:gap-6 sm:text-center">
          <p className="text-sm text-[#404040]">
            <span className="font-semibold text-[#171717]">想直接部署收钱？</span>{' '}
            看 <span className="text-[#16a34a] font-semibold">💰可以赚钱</span>
          </p>
          <span className="hidden text-[#e5e5e5] sm:inline">|</span>
          <p className="text-sm text-[#404040]">
            <span className="font-semibold text-[#171717]">有想法不知道怎么做？</span>{' '}
            看 <span className="text-[#2563eb] font-semibold">📖 深度拆解</span>
          </p>
        </div>
      </div>
    </section>
  );
}

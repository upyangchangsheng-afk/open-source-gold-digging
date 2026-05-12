export default function Hero() {
  return (
    <section className="px-4 pb-8 pt-10 sm:pt-16">
      <div className="mx-auto max-w-[900px] text-center">
        <h1 className="text-[28px] font-bold leading-tight text-[#171717] sm:text-4xl">
          用AI开源工具
          <span className="text-[#2563eb]">做能赚钱的小生意</span>
        </h1>
        <p className="mt-3 text-lg text-[#8a8a8a] sm:text-xl">
          不只是告诉你「这个能赚钱」——更告诉你第1天做什么、用什么工具、多久能接第一单
        </p>

        <div className="mt-6 inline-flex flex-col gap-2 rounded-2xl bg-white px-6 py-4 text-left shadow-sm sm:flex-row sm:gap-6 sm:text-center">
          <p className="text-sm text-[#404040]">
            <span className="font-semibold text-[#171717]">想找适合你的小生意？</span>{' '}
            看 <span className="text-[#2563eb] font-semibold">🎯 商业场景</span>
          </p>
          <span className="hidden text-[#e5e5e5] sm:inline">|</span>
          <p className="text-sm text-[#404040]">
            <span className="font-semibold text-[#171717]">想找具体开源工具？</span>{' '}
            看 <span className="text-[#16a34a] font-semibold">🔍 项目库</span>
          </p>
        </div>
      </div>
    </section>
  );
}

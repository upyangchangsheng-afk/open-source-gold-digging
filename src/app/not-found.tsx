import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-[#171717]">404</h1>
      <p className="mt-4 text-[#8a8a8a]">页面不存在</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-[#171717] px-6 py-2 text-sm text-white no-underline"
      >
        返回首页
      </Link>
    </div>
  );
}

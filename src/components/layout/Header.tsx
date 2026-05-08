'use client';

import { useState } from 'react';
import Link from 'next/link';
import { site } from '@/config/site';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#fafaf9]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[900px] items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-[#171717] no-underline">
          {site.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-6 sm:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[#404040] no-underline hover:text-[#171717]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg sm:hidden"
          onClick={() => setOpen(!open)}
          aria-label="菜单"
        >
          <span className="text-xl text-[#404040]">{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-black/5 bg-[#fafaf9] px-4 pb-4 sm:hidden">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 text-base text-[#404040] no-underline"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

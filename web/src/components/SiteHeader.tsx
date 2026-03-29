"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ROUTES,
  TOP_NAV,
  isDeepPath,
  isMachinePath,
} from "@/config/routes";

function navClass(active: boolean) {
  return active
    ? "text-zinc-100 border-b-2 border-indigo-500 pb-0.5"
    : "text-zinc-500 hover:text-zinc-300 border-b-2 border-transparent pb-0.5";
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-6">
        <Link
          href={ROUTES.home}
          className="text-sm font-semibold tracking-tight text-zinc-100 hover:text-white"
        >
          Ethan&apos;s AI Lab
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-4 text-sm font-medium sm:gap-6">
          {TOP_NAV.map((item) => {
            const active =
              item.key === "home"
                ? pathname === ROUTES.home
                : item.key === "deep"
                  ? isDeepPath(pathname)
                  : item.key === "machine"
                    ? isMachinePath(pathname)
                    : false;
            return (
              <Link key={item.key} href={item.href} className={navClass(active)}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

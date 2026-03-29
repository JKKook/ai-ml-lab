"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DEEP_THEORY_SUB_NAV,
  MACHINE_THEORY_SUB_NAV,
} from "@/config/routes";

export function TheorySubNav() {
  const pathname = usePathname();
  const items = pathname.startsWith("/machine/theory")
    ? MACHINE_THEORY_SUB_NAV
    : DEEP_THEORY_SUB_NAV;

  return (
    <div className="border-b border-zinc-800/60 bg-zinc-900/40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-1 px-6 py-2">
        <span className="mr-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
          이론
        </span>
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                active
                  ? "bg-zinc-800 text-violet-300"
                  : "text-zinc-500 hover:bg-zinc-800/60 hover:text-zinc-300"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

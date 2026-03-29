"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DEEP_LAB_SUB_NAV,
  MACHINE_LAB_SUB_NAV,
  ROUTES,
} from "@/config/routes";

export function LabSubNav() {
  const pathname = usePathname();
  const machineLab = pathname.startsWith("/machine/lab");
  const items = machineLab ? MACHINE_LAB_SUB_NAV : DEEP_LAB_SUB_NAV;
  const labRoot = machineLab ? ROUTES.machine.lab.root : ROUTES.deep.lab.root;

  return (
    <div className="border-b border-zinc-800/60 bg-zinc-900/40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-1 px-6 py-2">
        <span className="mr-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
          실습
        </span>
        {items.map((item) => {
          const active =
            item.href === labRoot
              ? pathname === labRoot
              : pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                active
                  ? "bg-zinc-800 text-indigo-300"
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

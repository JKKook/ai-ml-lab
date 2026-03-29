import type { ReactNode } from "react";
import { TheorySubNav } from "@/components/TheorySubNav";

export function TheoryShell({ children }: { children: ReactNode }) {
  return (
    <>
      <TheorySubNav />
      {children}
    </>
  );
}

"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type TheoryTabDef = {
  id: string;
  label: string;
  /** 이 탭 콘텐츠 안에 존재하는 앵커 id 목록 — 해시 링크 진입 시 탭 자동 전환용 */
  anchors: string[];
  content: ReactNode;
};

/**
 * 상세 이론 본문을 탭으로 나눠 활성 탭의 내용만 렌더링.
 * - 콘텐츠는 서버 컴포넌트에서 ReactNode 로 전달받아 그대로 사용
 * - #앵커 로 진입하거나(홈 Q&A 링크 등) 페이지 안 해시 링크를 누르면 해당 탭으로 전환
 */
export function TheoryTabs({ tabs }: { tabs: TheoryTabDef[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const navRef = useRef<HTMLDivElement | null>(null);

  const tabForAnchor = useCallback(
    (anchor: string) => tabs.find((t) => t.anchors.includes(anchor))?.id,
    [tabs],
  );

  // 해시를 달고 진입한 경우 해당 탭으로 전환 후 앵커 위치로 스크롤
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const target = tabForAnchor(id);
    if (!target) return;
    const raf = requestAnimationFrame(() => {
      setActiveId(target);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView();
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [tabForAnchor]);

  // 페이지 안 해시 링크(개념 묶음 표의 '이동' 등) 클릭 시 탭 전환
  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      const anchorEl = (event.target as HTMLElement | null)?.closest?.(
        'a[href*="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchorEl) return;
      const url = new URL(anchorEl.href, window.location.href);
      if (url.pathname !== window.location.pathname) return;
      const id = url.hash.slice(1);
      const target = tabForAnchor(id);
      if (!target || target === activeId) return;
      setActiveId(target);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView();
        });
      });
    }
    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
  }, [activeId, tabForAnchor]);

  const selectTab = (id: string) => {
    setActiveId(id);
    // 본문 중간까지 스크롤된 상태에서 탭을 바꾸면 탭 목록이 보이도록 위로 이동
    const nav = navRef.current;
    if (nav && nav.getBoundingClientRect().top < 0) {
      requestAnimationFrame(() => nav.scrollIntoView({ block: "start" }));
    }
  };

  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <div>
      <div
        ref={navRef}
        role="tablist"
        aria-label="상세 이론 주제 탭"
        className="mb-8 flex scroll-mt-24 flex-wrap gap-2"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active?.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => selectTab(tab.id)}
              className={
                isActive
                  ? "rounded-lg border border-violet-500/50 bg-violet-500/15 px-3.5 py-2 text-sm font-semibold text-white"
                  : "rounded-lg border border-zinc-700/70 bg-zinc-900/60 px-3.5 py-2 text-sm font-medium text-zinc-400 transition hover:border-zinc-500/60 hover:text-zinc-200"
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel">{active?.content}</div>
    </div>
  );
}

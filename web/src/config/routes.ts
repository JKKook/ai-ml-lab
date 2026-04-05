/**
 * 앱 전역 경로 — 메뉴·링크·리다이렉트에서 재사용
 * [root] /  →  [1depth] /deep, /machine  →  [2depth] …/theory, …/lab  →  [3depth] 하위 주제
 */
export const ROUTES = {
  home: "/",
  deep: {
    root: "/deep",
    theory: {
      root: "/deep/theory",
      math: "/deep/theory/math",
      code: "/deep/theory/code",
      detail: "/deep/theory/detail",
    },
    lab: {
      root: "/deep/lab",
      activationFunction: "/deep/lab/activation-function",
      backPropagation: "/deep/lab/back-propagation",
      optimization: "/deep/lab/optimization",
    },
  },
  machine: {
    root: "/machine",
    theory: {
      root: "/machine/theory",
      code: "/machine/theory/code",
      detail: "/machine/theory/detail",
    },
    lab: {
      root: "/machine/lab",
      rBasic: "/machine/lab/r-basic",
    },
  },
} as const;

export const TOP_NAV = [
  { key: "home" as const, href: ROUTES.home, label: "홈" },
  { key: "deep" as const, href: ROUTES.deep.root, label: "AI · 딥러닝" },
  {
    key: "machine" as const,
    href: ROUTES.machine.root,
    label: "머신러닝 · 빅데이터분석",
  },
];

export const DEEP_THEORY_SUB_NAV = [
  { href: ROUTES.deep.theory.root, label: "이론 홈" },
  { href: ROUTES.deep.theory.math, label: "수학" },
  { href: ROUTES.deep.theory.code, label: "코드" },
  { href: ROUTES.deep.theory.detail, label: "상세 이론" },
];

export const MACHINE_THEORY_SUB_NAV = [
  { href: ROUTES.machine.theory.root, label: "이론 홈" },
  { href: ROUTES.machine.theory.code, label: "코드" },
  { href: ROUTES.machine.theory.detail, label: "상세 이론" },
];

export const DEEP_LAB_SUB_NAV = [
  { href: ROUTES.deep.lab.root, label: "실습 홈" },
  { href: ROUTES.deep.lab.activationFunction, label: "활성 함수" },
  { href: ROUTES.deep.lab.backPropagation, label: "역전파" },
  { href: ROUTES.deep.lab.optimization, label: "최적화" },
];

export const MACHINE_LAB_SUB_NAV = [
  { href: ROUTES.machine.lab.root, label: "실습 홈" },
  { href: ROUTES.machine.lab.rBasic, label: "R 기초 데모" },
];

export function isDeepPath(pathname: string): boolean {
  return (
    pathname === ROUTES.deep.root || pathname.startsWith(`${ROUTES.deep.root}/`)
  );
}

export function isMachinePath(pathname: string): boolean {
  return (
    pathname === ROUTES.machine.root ||
    pathname.startsWith(`${ROUTES.machine.root}/`)
  );
}

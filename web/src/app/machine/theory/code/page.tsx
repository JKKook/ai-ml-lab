import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { TheoryShell } from "@/components/theory/TheoryShell";
import { TheoryTopicAccordion } from "@/components/theory/TheoryTopicAccordion";

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="my-3 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950/80 p-3 text-xs leading-relaxed text-emerald-100/90">
      {children}
    </pre>
  );
}

export default function MachineTheoryCodePage() {
  return (
    <TheoryShell>
      <div className="min-h-full bg-zinc-950 text-zinc-100">
        <main className="mx-auto max-w-3xl px-6 py-10">
          <header className="mb-8 flex flex-col gap-2">
            <p className="text-xs text-zinc-500">
              <Link href={ROUTES.home} className="hover:text-zinc-300">
                홈
              </Link>
              <span className="mx-2 text-zinc-700">/</span>
              <Link href={ROUTES.machine.root} className="hover:text-zinc-300">
                머신러닝 · 빅데이터
              </Link>
              <span className="mx-2 text-zinc-700">/</span>
              <Link href={ROUTES.machine.theory.root} className="hover:text-zinc-300">
                이론
              </Link>
              <span className="mx-2 text-zinc-700">/</span>
              <span className="text-zinc-400">코드 · R</span>
            </p>
            <h1 className="text-3xl font-bold">프로그램 R 개요 · 자주 쓰는 표현</h1>
            <p className="text-sm text-zinc-500">
              통계·그래프·데이터 전처리에 특화된 언어이며, 수식형 모델(
              <code className="text-zinc-400">lm</code>, <code className="text-zinc-400">glm</code>
              )을 짧은 코드로 다루기 좋습니다.
            </p>
          </header>

          <TheoryTopicAccordion
            title="R이란? (정의와 역할)"
            subtitle="통계 computing 환경 · 콘솔·스크립트·노트북"
            defaultOpen
          >
            <div className="space-y-3 text-sm text-zinc-400">
              <p>
                <strong className="text-zinc-300">R</strong>은 통계 분석과 그래프를 위한{" "}
                <strong className="text-zinc-300">프로그래밍 언어이자 실행 환경</strong>입니다.
                CRAN 패키지 생태계(<code className="text-zinc-300">ggplot2</code>,{" "}
                <code className="text-zinc-300">dplyr</code> 등)로 데이터 분석 워크플로가 잘
                갖춰져 있습니다.
              </p>
              <p>
                Python이 범용 프로그래밍·딥러닝 프레임워크와 잘 맞는다면, R은{" "}
                <strong className="text-zinc-300">회귀·분산분석·실험 설계·보고용 시각화</strong>에서
                코드가 간결해지는 경우가 많습니다.
              </p>
            </div>
          </TheoryTopicAccordion>

          <TheoryTopicAccordion
            title="기본 문법 · 자료 구조"
            subtitle="할당, 벡터, 데이터프레임"
          >
            <div className="space-y-2 text-sm text-zinc-400">
              <p>
                <code className="text-zinc-300">&lt;-</code>는 값을 이름에 대입하는 할당 연산자입니다(
                <code className="text-zinc-300">=</code>도 많이 씀). 스칼라·벡터·행렬·데이터프레임
                모두 <strong className="text-zinc-300">객체</strong>로 다룹니다.
              </p>
              <CodeBlock>{`x <- 1:5              # 시퀀스 정수 벡터
y <- c(0.2, 0.9, 1.1, 2.0, 2.8)  # c()로 연결
m <- matrix(rnorm(6), nrow = 2)  # 2×3 행렬
df <- data.frame(x = x, y = y)   # 표 형태(열은 변수)`}</CodeBlock>
              <p>
                <code className="text-zinc-300">str(df)</code>,{" "}
                <code className="text-zinc-300">summary(df)</code>로 구조·요약 통계를 빠르게 확인할
                수 있습니다.
              </p>
            </div>
          </TheoryTopicAccordion>

          <TheoryTopicAccordion
            title="데이터 읽기 · 요약 · 모델"
            subtitle="read.table, lm, formula"
          >
            <div className="space-y-2 text-sm text-zinc-400">
              <CodeBlock>{`# CSV 예시 (경로·구분자는 데이터에 맞게)
d <- read.csv("data.csv", stringsAsFactors = FALSE)

# 선형 회귀: y ~ x 는 'y를 x로 설명'하는 수식 표기
fit <- lm(y ~ x, data = d)
summary(fit)          # 계수, R-squared, 검정 결과

# 산점도 + 적합 직선
plot(y ~ x, data = d)
abline(fit, col = "steelblue")`}</CodeBlock>
              <p>
                <code className="text-zinc-300">~</code> 오른쪽에 여러 설명 변수를 넣으면 다중 회귀(
                <code className="text-zinc-300">lm(y ~ x1 + x2)</code>)가 됩니다.
              </p>
            </div>
          </TheoryTopicAccordion>

          <TheoryTopicAccordion
            title="자주 쓰는 베이스 R (명령어 뼈대)"
            subtitle="seq, rep, length, apply 계열, 결측 처리"
          >
            <div className="space-y-2 text-sm text-zinc-400">
              <CodeBlock>{`seq(from = 0, to = 1, length.out = 11)  # 균등 간격
rep(1:3, times = 2)           # 반복
length(x)                     # 벡터 길이
names(df) <- c("a", "b")      # 이름 붙이기
head(df, n = 10); tail(df)     # 앞·뒤 미리보기

sum(x, na.rm = TRUE)           # 결측 제외 합
mean(y); median(y); var(y)     # 기술 통계
apply(mat, 1, mean)            # 행마다 평균 (1: 행, 2: 열)
sapply(lst, class)             # 리스트에 함수 적용 후 단순화
na.omit(df)                    # 결측 포함 행 제거
is.na(x)                       # 결측 여부 논리벡터
table(f)                       # 범주별 도수`}</CodeBlock>
              <p>
                스크립트가 길어질수록 <code className="text-zinc-300">str()</code>,{" "}
                <code className="text-zinc-300">dim()</code>,{" "}
                <code className="text-zinc-300">class()</code>로 객체 구조를 먼저 확인하는 습관이
                디버깅에 도움이 됩니다.
              </p>
            </div>
          </TheoryTopicAccordion>

          <TheoryTopicAccordion
            title="dplyr · ggplot2 (현대적 워크플로)"
            subtitle="전처리와 시각화"
          >
            <div className="space-y-2 text-sm text-zinc-400">
              <CodeBlock>{`library(dplyr)
library(ggplot2)

d2 <- d |>
  filter(x > 0) |>
  mutate(z = y - mean(y))

ggplot(d2, aes(x = x, y = y)) +
  geom_point() +
  geom_smooth(method = "lm", se = TRUE)`}</CodeBlock>
              <p>
                <code className="text-zinc-300">|&gt;</code>는 파이프: 앞 단계 결과를 다음 함수의
                첫 인자로 넘깁니다. <code className="text-zinc-300">ggplot</code>은 레이어를
                쌓아 그래프를 만듭니다.
              </p>
            </div>
          </TheoryTopicAccordion>

          <p className="mt-6 text-xs text-zinc-600">
            라우트:{" "}
            <code className="text-zinc-500">{ROUTES.machine.theory.code}</code>
          </p>
        </main>
      </div>
    </TheoryShell>
  );
}

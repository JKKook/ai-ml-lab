## AI / ML Lab Monorepo

이 레포는 **AI / 머신러닝 실험 노트북**과 이를 설명·시각화하는 **웹 프론트엔드(Next.js)** 를 함께 관리하는 모노레포입니다.

구성은 크게 다음 세 부분으로 나뉩니다.

- `notebooks/` : Jupyter 노트북 실험(로컬에만 두고 **Git에서는 제외**)
- `scripts/` : Jupyter Lab 실행 등 유틸리티 스크립트
- `web/` : Next.js 기반 프론트엔드 (시각화, 데모 UI)

---

## 디렉터리 구조

```bash
ai-ml-lab/
├─ README.md
├─ .gitignore
├─ requirements.txt        # 파이썬 의존성
├─ notebooks/              # Jupyter 노트북 (로컬 전용, .gitignore)
├─ scripts/                # 파이썬 유틸 스크립트
│  └─ jupyter_lab_frame.py
└─ web/                    # Next.js 프론트엔드 앱
   ├─ package.json
   ├─ next.config.ts
   ├─ src/
   │  ├─ app/
   │  │  ├─ page.tsx
   │  │  ├─ layout.tsx
   │  │  └─ globals.css
   │  ├─ components/
   │  └─ config/
   └─ ...
```

---

## 파이썬 환경 (노트북 / 스크립트)

### 1. 의존성 설치

루트에서 가상 환경을 만들고 의존성을 설치합니다.

```bash
cd ai-ml-lab

python -m venv .venv
source .venv/bin/activate    # Windows: .venv\Scripts\activate

pip install -r requirements.txt
```

`requirements.txt` 에는 대략 다음과 같은 의존성이 포함됩니다.

- `torch` (PyTorch)
- `matplotlib`
- `numpy`
- `jupyter` / `ipykernel`

### 2. Jupyter Lab 실행

#### 옵션 A: 직접 Jupyter Lab 실행

```bash
cd ai-ml-lab
source .venv/bin/activate

jupyter lab
```

브라우저에서 열린 Jupyter Lab UI에서 `notebooks/` 아래 노트북을 선택해 실행합니다.

#### 옵션 B: 스크립트를 통해 실행

`scripts/jupyter_lab_frame.py` 가 Jupyter 관련 실행을 감싸는 유틸 스크립트라면, 다음처럼 실행할 수 있습니다.

```bash
cd ai-ml-lab
source .venv/bin/activate

python scripts/jupyter_lab_frame.py
```

> 스크립트 내용에 따라 포트, 루트 디렉터리 등의 세부 동작은 달라질 수 있습니다.

---

## 웹 프론트엔드 (Next.js)

웹 앱은 `web/` 디렉터리 안의 Next.js 16 / React 19 프로젝트입니다.

### 1. 의존성 설치

```bash
cd ai-ml-lab/web

npm install
# 또는
# pnpm install
# yarn install
```

### 2. 개발 서버 실행

```bash
cd ai-ml-lab/web

npm run dev
```

브라우저에서 `http://localhost:3000` 으로 접속하면 UI를 확인할 수 있습니다.

주요 스크립트:

- `npm run dev` : 개발 서버
- `npm run build` : 프로덕션 빌드
- `npm run start` : 빌드 결과 실행
- `npm run lint` : ESLint 실행

### 3. 주요 경로

`web/src/app` 은 Next.js App Router 구조를 사용합니다.

- `web/src/app/page.tsx` : 루트 페이지
- `web/src/app/layout.tsx` : 전체 레이아웃
- `web/src/components/Scatter3D.tsx` 등 : 그래프 / 시각화 컴포넌트
- `web/src/hooks/` : 데모용 커스텀 훅 (예: `useActivationDemo`, `useBackpropDemo`)
- `web/src/config/` : 경로/데모 설정 (`routes.ts`, `lab-demos.ts`, `notebook-snippets.ts`)

`next.config.ts` 에 정의된 리다이렉트는 다음과 같이 개념별 경로를 정리합니다.

- `/theory` → `/deep/theory`
- `/lab` → `/deep/lab`
- `/activation`, `/backprop` → 각각 대응되는 딥러닝 랩 페이지
- `/machine/...` → 머신러닝 관련 랩/이론 페이지

---

## 개발 워크플로 예시

1. **처음 클론 / 셋업**
   - `python -m venv .venv` 및 `pip install -r requirements.txt`
   - `cd web && npm install`
2. **노트북 실험**
   - `source .venv/bin/activate`
   - `jupyter lab` 또는 `python scripts/jupyter_lab_frame.py`
   - `notebooks/` 아래 노트북을 열어 실험/수정
3. **웹 UI 개발**
   - `cd web`
   - `npm run dev` 로 UI 개발
4. **품질 체크**
   - `cd web && npm run lint`
   - `cd web && npm run build`

---

## Git 초기화 가이드

구조와 빌드가 정상 동작하는 것을 확인한 뒤, 아래 순서로 Git을 초기화하는 것을 추천합니다.

```bash
cd ai-ml-lab

git init
git add .
git commit -m \"chore: initialize ai ml lab repo\"
```

이미 `.gitignore` 에는 다음이 포함되어 있습니다.

- `notebooks/` (노트북 전체 디렉터리 미추적)
- `.venv/`, `__pycache__/`, `.ipynb_checkpoints/`, `.mplconfig/`
- 빌드·산출물: `dist/`, `build/`, `htmlcov/`, `*.egg-info/`, `web/out/`, `coverage/`, `*.tsbuildinfo`, `.coverage` 등
- `web/node_modules/`, `web/.next/`, `web/.turbo/`
- `.env`, `*.env`, `web/.env.local`
- `.vscode/`, `.DS_Store`

---

## 향후 확장 아이디어

- `notebooks/` 를 주제별 서브폴더로 분리 (예: `deep-learning/`, `machine-learning/` 등)
- 자주 사용하는 파이썬 로직을 별도 패키지 디렉터리(예: `packages/py-ml-core/`) 로 추출
- 웹에서 노트북 실행 결과를 직접 연동하는 API 또는 정적 아티팩트 파이프라인 추가

현재 구조는 **실험용 노트북과 프론트 UI를 한 레포에서 관리**하면서도 역할별 폴더를 분리해, 유지보수와 확장을 모두 고려한 형태입니다.


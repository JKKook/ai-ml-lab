import { ROUTES } from "./routes";

/** 실습(/deep/lab) 카드·홈 안내에서 공통 사용 */
export const LAB_DEMO_CARDS = [
    {
        href: ROUTES.deep.lab.activationFunction,
        title: 'Activation Functions',
        titleKo: '활성화 함수',
        description:
            'Generate 1,000 random samples, pass through a linear layer, then apply ReLU / Sigmoid / GELU / Tanh. See distribution histograms, activation curves, and a live 3D input-space scatter — all updating instantly.',
        descriptionKo:
            '정규분포에서 뽑은 입력이 선형층을 거친 뒤 활성화를 통과하면 값의 분포가 어떻게 바뀌는지 눈으로 확인합니다. 히스토그램·곡선·3D 산점도가 같은 데이터 흐름을 서로 다른 각도에서 보여 줍니다.',
        badge: 'torch.nn.functional',
        badgeColor: 'bg-amber-900/40 text-amber-300 border-amber-800/60',
        glow: 'from-amber-500/15 to-transparent',
        border: 'border-amber-500/25 hover:border-amber-500/50',
        accent: '#f59e0b',
        // icon: "⚡",
    },
    {
        href: ROUTES.deep.lab.backPropagation,
        title: 'Backpropagation',
        titleKo: '역전파',
        description:
            'Animate a 1-hidden-layer sigmoid network learning the identity function (0→0, 1→1). Watch loss fall, weights converge, and predictions correct themselves in real time.',
        descriptionKo:
            '아주 작은 네트워크가 ‘입력 그대로 출력’이라는 규칙을 맞추기 위해 가중치를 고쳐 나가는 과정입니다. 손실(loss)이 줄고 예측이 목표에 가까워지는 흐름이 역전파의 직관과 연결됩니다.',
        badge: 'numpy backprop',
        badgeColor: 'bg-emerald-900/40 text-emerald-300 border-emerald-800/60',
        glow: 'from-emerald-500/15 to-transparent',
        border: 'border-emerald-500/25 hover:border-emerald-500/50',
        accent: '#10b981',
        // icon: "🔁",
    },
    {
        href: ROUTES.deep.lab.optimization,
        title: 'Optimization',
        titleKo: '최적화',
        description:
            'Compare SGD, Momentum, RMSprop, and Adam on the 2D Rosenbrock function. Scrub through steps, watch the (x,y) path toward the global minimum, and open matching PyTorch snippets to run the same experiment locally.',
        descriptionKo:
            'Rosenbrock 목적함수에서 SGD·모멘텀·RMSprop·Adam의 궤적과 손실 곡선을 비교합니다. 스텝을 되감으며 (x,y)가 (1,1) 근처로 어떻게 움직이는지 보고, 동일 설정의 PyTorch 코드를 복사해 로컬에서 돌려 볼 수 있습니다.',
        badge: 'torch.optim',
        badgeColor: 'bg-orange-900/40 text-orange-300 border-orange-800/60',
        glow: 'from-orange-500/15 to-transparent',
        border: 'border-orange-500/25 hover:border-orange-500/50',
        accent: '#f97316',
    },
] as const;

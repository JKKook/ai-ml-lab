import Link from 'next/link';
import { ROUTES } from '@/config/routes';

const TOP_SECTIONS = [
    {
        href: ROUTES.deep.root,
        title: 'AI · 딥러닝',
        titleEn: 'Deep learning',
        description:
            '이론과 실습으로 나뉩니다. 활성화 함수·역전파 등을 학습합니다.',
        border: 'border-indigo-500/25 hover:border-indigo-500/50',
        glow: 'from-indigo-500/15 to-transparent',
        accent: '#a5b4fc',
    },
    {
        href: ROUTES.machine.root,
        title: '머신러닝 · 빅데이터분석',
        titleEn: 'ML & analytics',
        description:
            '이론과 실습으로 나뉩니다. 프로그램 R과 같은 데이터분석 도구를 학습합니다.',
        border: 'border-emerald-500/25 hover:border-emerald-500/50',
        glow: 'from-emerald-500/15 to-transparent',
        accent: '#6ee7b7',
    },
];

export default function Home() {
    return (
        <div className='min-h-full bg-zinc-950 text-zinc-100'>
            <main className='mx-auto flex max-w-4xl flex-col gap-14 px-6 py-16'>
                <header className='flex flex-col gap-5'>
                    <h1 className='text-5xl font-extrabold tracking-tight text-white'>
                        <span className='bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                            Ethan&apos;s AI Lab
                        </span>
                    </h1>

                    <p className='max-w-xl text-base leading-relaxed text-zinc-400'>
                        Interactive re-implementation of{' '}
                        <code className='rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300'>
                            deep/machine learning sample codes
                        </code>{' '}
                        in the browser. All math runs in TypeScript.
                    </p>

                    <p className='max-w-xl border-l-2 border-zinc-700 pl-4 text-sm leading-relaxed text-zinc-500'>
                        상단 메뉴는{' '}
                        <strong className='text-zinc-400'>홈</strong>,{' '}
                        <strong className='text-zinc-400'>AI · 딥러닝</strong>,{' '}
                        <strong className='text-zinc-400'>
                            머신러닝 · 빅데이터분석
                        </strong>{' '}
                        세 구간입니다. 각 트랙 안에서 다시{' '}
                        <strong className='text-zinc-400'>이론</strong>·
                        <strong className='text-zinc-400'>실습</strong>으로
                        나뉩니다.
                    </p>
                </header>

                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                    {TOP_SECTIONS.map((s) => (
                        <Link
                            key={s.href}
                            href={s.href}
                            className={`group relative flex flex-col gap-5 overflow-hidden rounded-2xl border bg-zinc-900/60 p-7 transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-900 hover:shadow-2xl ${s.border}`}
                        >
                            <div
                                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.glow}`}
                            />
                            <div className='relative flex flex-col gap-2'>
                                <div className='flex flex-wrap items-baseline gap-x-2 gap-y-0'>
                                    <h2 className='text-xl font-bold text-zinc-100 group-hover:text-white'>
                                        {s.title}
                                    </h2>
                                    <span className='text-sm font-medium text-zinc-500'>
                                        {s.titleEn}
                                    </span>
                                </div>
                                <p className='text-sm leading-relaxed text-zinc-400'>
                                    {s.description}
                                </p>
                            </div>
                            <span
                                className='relative mt-auto text-xs font-semibold transition-colors'
                                style={{ color: s.accent }}
                            >
                                이동 →
                            </span>
                        </Link>
                    ))}
                </div>

                <footer className='space-y-1 text-xs text-zinc-600'>
                    <p>
                        Notebook source:{' '}
                        <code className='text-zinc-500'>pytorch</code>
                        {' · '}
                        Built with Next.js + Recharts + Canvas API
                    </p>
                </footer>
            </main>
        </div>
    );
}

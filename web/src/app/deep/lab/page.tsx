import Link from 'next/link';
import { LAB_DEMO_CARDS } from '@/config/lab-demos';
import { ROUTES } from '@/config/routes';

export default function LabHomePage() {
    return (
        <div className='min-h-full bg-zinc-950 text-zinc-100'>
            <main className='mx-auto flex max-w-4xl flex-col gap-10 px-6 py-12'>
                <header className='flex flex-col gap-3'>
                    <p className='text-xs text-zinc-500'>
                        <Link
                            href={ROUTES.home}
                            className='hover:text-zinc-300'
                        >
                            홈
                        </Link>
                        <span className='mx-2 text-zinc-700'>/</span>
                        <Link
                            href={ROUTES.deep.root}
                            className='hover:text-zinc-300'
                        >
                            AI · 딥러닝
                        </Link>
                        <span className='mx-2 text-zinc-700'>/</span>
                        <span className='text-zinc-400'>실습</span>
                    </p>
                    <h1 className='text-3xl font-bold'>
                        실습 · 딥러닝 비주얼라이저
                    </h1>
                    <p className='max-w-2xl text-sm leading-relaxed text-zinc-500'>
                        브라우저에서 동작하는 인터랙티브 데모입니다. 아래 카드는{' '}
                        <code className='rounded bg-zinc-800 px-1 text-zinc-400'>
                            pytorch
                        </code>{' '}
                        코드 예제의 흐름을 따릅니다.
                    </p>
                </header>

                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                    {LAB_DEMO_CARDS.map((s) => (
                        <Link
                            key={s.href}
                            href={s.href}
                            className={`group relative flex flex-col gap-5 overflow-hidden rounded-2xl border bg-zinc-900/60 p-7 transition-all duration-200 hover:scale-[1.01] hover:bg-zinc-900 hover:shadow-xl ${s.border}`}
                        >
                            <div
                                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.glow}`}
                            />
                            <span
                                className={`relative inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${s.badgeColor}`}
                            >
                                {s.badge}
                            </span>
                            <div className='relative flex flex-col gap-2'>
                                <div className='flex flex-wrap items-baseline gap-x-2 gap-y-0'>
                                    {/* <span className='text-2xl'>{s?.icon}</span> */}
                                    <h2 className='text-xl font-bold text-zinc-100 group-hover:text-white'>
                                        {s.title}
                                    </h2>
                                    <span className='text-sm font-medium text-zinc-500'>
                                        {s.titleKo}
                                    </span>
                                </div>
                                <p className='text-sm leading-relaxed text-zinc-400'>
                                    {s.description}
                                </p>
                                <p className='text-sm leading-relaxed text-zinc-500'>
                                    {s.descriptionKo}
                                </p>
                            </div>
                            <span
                                className='relative mt-auto text-xs font-semibold transition-colors'
                                style={{ color: s.accent }}
                            >
                                데모 열기 →
                            </span>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}

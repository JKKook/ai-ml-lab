import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SiteHeader } from '@/components/SiteHeader';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'AI/ML Lab — 딥러닝·머신러닝 시각화 & 인터랙티브 데모',
    description:
        '딥러닝/머신러닝 핵심 개념을 인터랙티브 데모와 그래프로 탐색합니다.',
    openGraph: {
        title: 'AI/ML Lab',
        description:
            '딥러닝/머신러닝 핵심 개념을 인터랙티브 데모와 그래프로 탐색합니다.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI/ML Lab',
        description:
            '딥러닝/머신러닝 핵심 개념을 인터랙티브 데모와 그래프로 탐색합니다.',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang='ko'
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className='flex min-h-full flex-col bg-zinc-950 text-zinc-100'>
                <SiteHeader />
                <div className='flex flex-1 flex-col'>{children}</div>
            </body>
        </html>
    );
}

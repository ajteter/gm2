'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './play.module.css';
import { Suspense, useState } from 'react';

function PlayGame() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const gameUrl = searchParams.get('url');
    const [isIframeLoading, setIsIframeLoading] = useState(true);

    if (!gameUrl) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <p>游戏链接无效。</p>
                    <Link href="/">返回首页</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {isIframeLoading && (
                <div className={styles.loadingOverlay}>
                    <div className="emptyIcon" />
                </div>
            )}
            <iframe
                src={gameUrl}
                className={styles.iframe}
                title="Game"
                allow="autoplay; fullscreen; payment"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-orientation-lock"
                onLoad={() => setIsIframeLoading(false)}
            />
            <button onClick={() => router.back()} className={styles.backButton} aria-label="返回">
                &larr;
            </button>
        </div>
    );
}

export default function PlayPage() {
    return (
        <Suspense fallback={<div className={styles.container}></div>}>
            <PlayGame />
        </Suspense>
    );
}
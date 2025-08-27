'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './play.module.css';
import { Suspense, useState } from 'react';

function PlayGame() {
    const searchParams = useSearchParams();
    const gameUrl = searchParams.get('url');
    const [loaded, setLoaded] = useState(false);

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
            <Link href="/" className={styles.backButton}>
                &larr; 返回
            </Link>
            <div className={styles.gameWrapper}>
                {!loaded && (
                    <button className={styles.playButton} onClick={() => setLoaded(true)}>
                        开始游戏
                    </button>
                )}
                {loaded && (
                    <iframe
                        src={gameUrl}
                        className={styles.iframe}
                        title="Game"
                        allow="autoplay; fullscreen; payment"
                        allowFullScreen
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-orientation-lock"
                    />
                )}
            </div>
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

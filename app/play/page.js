'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './play.module.css';

export default function PlayPage() {
    const searchParams = useSearchParams();
    const gameUrl = searchParams.get('url');

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
            <iframe
                src={gameUrl}
                className={styles.iframe}
                title="Game"
                allow="autoplay; fullscreen; payment"
                allowFullScreen
            />
            <Link href="/" className={styles.backButton}>
                &larr; 返回
            </Link>
        </div>
    );
}

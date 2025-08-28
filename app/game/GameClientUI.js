'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './game.module.css';

export default function GameClientUI({ game }) {
    const router = useRouter();

    const handleAnotherGame = () => {
        // Use router.push with a random query string to bypass the server-side cache
        router.push(`/game?t=${new Date().getTime()}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={handleAnotherGame} className={styles.actionButton}>Another Game</button>
                <Link href="/" className={styles.actionButton}>More Games</Link>
            </div>
            <iframe
                src={game.url}
                className={styles.iframe}
                title={game.title}
                allow="autoplay; fullscreen; payment"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-orientation-lock"
            />
        </div>
    );
}

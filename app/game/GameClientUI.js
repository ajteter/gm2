'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import styles from './game.module.css';

const DiceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <path d="M16 8h.01"></path>
        <path d="M12 12h.01"></path>
        <path d="M8 16h.01"></path>
        <path d="M8 8h.01"></path>
        <path d="M12 16h.01"></path>
        <path d="M16 16h.01"></path>
    </svg>
);

const GridIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
);

export default function GameClientUI({ game, randomPath, listPath }) {

    const handleAnotherGame = () => {
        // Use location.replace to navigate without adding to browser history, preventing the "back button trap".
        window.location.replace(`${randomPath}?t=${new Date().getTime()}`);
    };

    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense push error:", e);
        }
    }, []); // Run once on mount

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.buttonGroup}>
                    <button onClick={handleAnotherGame} className={styles.actionButton}>
                        <DiceIcon />
                        <span>Another Game</span>
                    </button>
                    <Link href={listPath} className={styles.actionButton}>
                        <GridIcon />
                        <span>More Games</span>
                    </Link>
                </div>
                <div className={styles.adContainer}>
                    <ins className="adsbygoogle"
                         style={{display: 'block', minHeight: '50px'}}
                         data-ad-client="ca-pub-6779881482191995"
                         data-ad-slot="7859383456"
                         data-ad-format="auto"
                         data-full-width-responsive="true"></ins>
                </div>
            </div>

            <div className={styles.mainContent}>
                <iframe
                    src={game.url}
                    className={styles.iframe}
                    title={game.title}
                    allow="autoplay; fullscreen; payment"
                    allowFullScreen
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-orientation-lock"
                />
            </div>
        </div>
    );
}

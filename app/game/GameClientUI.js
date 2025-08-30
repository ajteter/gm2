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
        // Use location.replace to prevent back button trap in WebView
        const timestamp = new Date().getTime();
        window.location.replace(`${randomPath}?t=${timestamp}`);
    };

    useEffect(() => {
        // Delay AdSense initialization to ensure DOM is ready
        const timer = setTimeout(() => {
            try {
                if (typeof window !== 'undefined' && window.adsbygoogle) {
                    console.log('Initializing AdSense...');
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                    console.log('AdSense initialized');
                } else {
                    console.warn('AdSense script not loaded');
                }
            } catch (e) {
                console.error("AdSense initialization error:", e);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

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
            </div>

            <div className={styles.mainContent}>
                <iframe
                    src={game.url}
                    className={styles.iframe}
                    title={game.title}
                    allow="autoplay; fullscreen; payment"
                    allowFullScreen
                />
            </div>

            <div className={styles.adContainer}>
                <ins className="adsbygoogle"
                     style={{display: 'block'}}
                     data-ad-client="ca-pub-6779881482191995"
                     data-ad-slot="7859383456"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
            </div>
        </div>
    );
}

'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './game.module.css';
import { CONFIG } from '../lib/config';

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
    const adContainerRef = useRef(null);
    const preloadLinksRef = useRef([]);

    const handleAnotherGame = () => {
        const timestamp = new Date().getTime();
        window.location.replace(`${randomPath}?t=${timestamp}`);
    };

    useEffect(() => {
        // 清理之前的预加载链接
        preloadLinksRef.current.forEach(link => {
            if (link.parentNode) {
                link.parentNode.removeChild(link);
            }
        });
        preloadLinksRef.current = [];

        // 预加载GameMonetize域名
        const preloadDomains = [
            'https://api.gamemonetize.com',
            'https://ads.gamemonetize.com',
            'https://cdn.gamemonetize.com'
        ];
        
        preloadDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            document.head.appendChild(link);
            preloadLinksRef.current.push(link);
        });

        return () => {
            // 清理预加载链接
            preloadLinksRef.current.forEach(link => {
                if (link.parentNode) {
                    link.parentNode.removeChild(link);
                }
            });
        };
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
                    allow="autoplay; fullscreen; payment; display-capture; camera; microphone; geolocation; accelerometer; gyroscope; magnetometer; clipboard-read; clipboard-write"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-orientation-lock allow-top-navigation-by-user-activation allow-storage-access-by-user-activation"
                    loading="eager"
                />
            </div>

            <div className={styles.adContainer} ref={adContainerRef}>
                <div id="banner-ad-container" style={{textAlign: 'center'}}>
                    <script type="text/javascript" dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                if (!window.atOptionsLoaded) {
                                    window.atOptions = {
                                        'key' : '${CONFIG.ADS.BANNER.key}',
                                        'format' : '${CONFIG.ADS.BANNER.format}',
                                        'height' : ${CONFIG.ADS.BANNER.height},
                                        'width' : Math.min(${CONFIG.ADS.BANNER.maxWidth}, window.innerWidth - 20),
                                        'params' : {}
                                    };
                                    window.atOptionsLoaded = true;
                                }
                            })();
                        `
                    }} />
                    <script type="text/javascript" src="https://www.highperformanceformat.com/fcc762bb57d3b98bebe1d12335e8d590/invoke.js"></script>
                </div>
            </div>
        </div>
    );
}

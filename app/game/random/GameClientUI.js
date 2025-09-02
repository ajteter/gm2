'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import styles from './game.module.css';
import { CONFIG } from '../../lib/config';

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
        const timestamp = new Date().getTime();
        window.location.replace(`${randomPath}?t=${timestamp}`);
    };

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
                    loading="eager"
                    muted
                />
            </div>

            <div className={styles.adContainer}>
                <script type="text/javascript" dangerouslySetInnerHTML={{
                    __html: `
                        (function() {
                            const screenWidth = window.innerWidth;
                            const banners = ${JSON.stringify(CONFIG.ADS.BANNER)};
                            let adConfig;
                            let scriptKey;
                            
                            if (screenWidth >= banners.LARGE.minScreenWidth) {
                                adConfig = {
                                    'key': banners.LARGE.key,
                                    'format': 'iframe',
                                    'height': banners.LARGE.height,
                                    'width': banners.LARGE.width,
                                    'params': {}
                                };
                                scriptKey = banners.LARGE.key;
                            } else if (screenWidth >= banners.MEDIUM.minScreenWidth) {
                                adConfig = {
                                    'key': banners.MEDIUM.key,
                                    'format': 'iframe',
                                    'height': banners.MEDIUM.height,
                                    'width': banners.MEDIUM.width,
                                    'params': {}
                                };
                                scriptKey = banners.MEDIUM.key;
                            } else {
                                adConfig = {
                                    'key': banners.SMALL.key,
                                    'format': 'iframe',
                                    'height': banners.SMALL.height,
                                    'width': banners.SMALL.width,
                                    'params': {}
                                };
                                scriptKey = banners.SMALL.key;
                            }
                            
                            window.atOptions = adConfig;
                            
                            // 动态加载对应的广告脚本
                            const script = document.createElement('script');
                            script.type = 'text/javascript';
                            script.src = '//www.highperformanceformat.com/' + scriptKey + '/invoke.js';
                            document.head.appendChild(script);
                        })();
                    `
                }} />
            </div>
        </div>
    );
}

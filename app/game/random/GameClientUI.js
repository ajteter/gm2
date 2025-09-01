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
        const timestamp = new Date().getTime();
        window.location.replace(`${randomPath}?t=${timestamp}`);
    };

    useEffect(() => {
        // 检查是否是从Another Game按钮跳转过来的
        const urlParams = new URLSearchParams(window.location.search);
        const isFromAnotherGame = urlParams.has('t');
        
        if (isFromAnotherGame) {
            // 检查是否已经显示过弹出广告
            const hasShownPopup = sessionStorage.getItem('popupAdShown');
            
            if (!hasShownPopup) {
                // WebView环境延迟3秒确保完全加载
                const timer = setTimeout(() => {
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.async = true;
                    script.setAttribute('data-cfasync', 'false');
                    script.src = '//pl27550696.revenuecpmgate.com/e7/2b/60/e72b604475c837e80b428e839e5c9e84.js';
                    document.head.appendChild(script);
                    
                    // 标记已显示过弹出广告
                    sessionStorage.setItem('popupAdShown', 'true');
                }, 3000);

                return () => clearTimeout(timer);
            }
        }
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
                    loading="eager"
                    muted
                />
            </div>

            <div className={styles.adContainer}>
                <script type="text/javascript" dangerouslySetInnerHTML={{
                    __html: `
                        atOptions = {
                            'key' : '3c5f1a4eaca07385fc217a28949de1d9',
                            'format' : 'iframe',
                            'height' : 60,
                            'width' : 468,
                            'params' : {}
                        };
                    `
                }} />
                <script type="text/javascript" src="//www.highperformanceformat.com/3c5f1a4eaca07385fc217a28949de1d9/invoke.js"></script>
            </div>
        </div>
    );
}

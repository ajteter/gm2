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

    useEffect(() => {
        // 检测页面URL变化，显示返回按钮
        const checkForAdRedirect = () => {
            if (window.location.href !== window.location.origin + '/game/random' && 
                !window.location.href.includes('/game/random?t=')) {
                // 页面被广告重定向，显示返回提示
                const returnButton = document.createElement('div');
                returnButton.innerHTML = `
                    <div style="position: fixed; top: 10px; left: 10px; z-index: 9999; 
                                background: #000; color: #fff; padding: 10px 15px; 
                                border-radius: 5px; cursor: pointer; font-size: 14px;
                                box-shadow: 0 2px 10px rgba(0,0,0,0.5);">
                        ← 返回游戏
                    </div>
                `;
                returnButton.onclick = () => {
                    window.history.back();
                };
                document.body.appendChild(returnButton);
            }
        };

        // 延迟检测，给广告时间加载
        setTimeout(checkForAdRedirect, 2000);
        
        // 监听页面变化
        window.addEventListener('beforeunload', checkForAdRedirect);
        
        return () => {
            window.removeEventListener('beforeunload', checkForAdRedirect);
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
                    loading="eager"
                    muted
                />
            </div>

            <div className={styles.adContainer}>
                <iframe 
                    srcDoc={`
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                body { margin: 0; padding: 0; overflow: hidden; }
                                * { max-width: 100% !important; max-height: 90px !important; }
                            </style>
                        </head>
                        <body>
                            <script type="text/javascript">
                                window.atOptions = {
                                    'key': '${CONFIG.ADS.FIXED_BANNER.key}',
                                    'format': 'iframe',
                                    'height': 90,
                                    'width': 728,
                                    'params': {}
                                };
                            </script>
                            <script type="text/javascript" src="${CONFIG.ADS.DOMAINS.highPerformance}/${CONFIG.ADS.FIXED_BANNER.key}/invoke.js"></script>
                        </body>
                        </html>
                    `}
                    sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-popups"
                    style={{
                        width: '100%',
                        height: '90px',
                        border: 'none',
                        maxHeight: '90px',
                        overflow: 'hidden'
                    }}
                />
            </div>
        </div>
    );
}

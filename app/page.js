'use client';

import { useEffect } from 'react';

export default function HomePage() {
    useEffect(() => {
        // 添加广告验证脚本
        const script = document.createElement('script');
        script.src = 'https://fpyf8.com/88/tag.min.js';
        script.setAttribute('data-zone', '168235');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        document.head.appendChild(script);

        // 延迟跳转，给广告脚本时间加载
        const timer = setTimeout(() => {
            window.location.replace('/game');
        }, 1000);

        return () => {
            clearTimeout(timer);
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#16181d',
            color: '#fff',
            fontSize: '18px'
        }}>
            Loading...
        </div>
    );
}

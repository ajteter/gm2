'use client';

import { useEffect } from 'react';

export default function HomePage() {
    useEffect(() => {
        // 延迟跳转
        const timer = setTimeout(() => {
            window.location.replace('/game');
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            <script 
                src="https://fpyf8.com/88/tag.min.js" 
                data-zone="168235" 
                async 
                data-cfasync="false"
            />
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
        </>
    );
}

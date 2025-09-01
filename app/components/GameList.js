'use client';

import { useEffect } from 'react';
import GameCard from './GameCard';

export default function GameList({ items }) {
    useEffect(() => {
        // 加载广告脚本
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = '//pl27523592.revenuecpmgate.com/3491e7d5bbb9e2dc2e99c16f98d8e05e/invoke.js';
        document.head.appendChild(script);

        return () => {
            // 清理脚本
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return (
        <ul className="grid onecol">
            {items?.map((game, index) => (
                <>
                    <GameCard key={game.id} game={game} />
                    {index === 0 && (
                        <li>
                            <div id="container-3491e7d5bbb9e2dc2e99c16f98d8e05e"></div>
                        </li>
                    )}
                    {(index + 1) % 5 === 0 && (
                        <li>
                            <div id={`ezoic-ad-${index + 1}`} />
                        </li>
                    )}
                </>
            ))}
        </ul>
    );
}

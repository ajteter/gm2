'use client';

import { useEffect } from 'react';
import GameCard from './GameCard';

export default function GameList({ items }) {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.ezstandalone) {
            window.ezstandalone.showAds();
        }
    }, [items]);

    return (
        <ul className="grid onecol">
            {items?.map((game, index) => (
                <>
                    <GameCard key={game.id} game={game} />
                    {index === 0 &&
                        <li>
                            {/* Ezoic - under_first_paragraph - under_first_paragraph */}
                            <div id="ezoic-pub-ad-placeholder-118"></div>
                            {/* End Ezoic - under_first_paragraph - under_first_paragraph */}
                        </li>
                    }
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

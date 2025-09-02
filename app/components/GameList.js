'use client';

import GameCard from './GameCard';

export default function GameList({ items }) {
    return (
        <ul className="grid onecol">
            {items?.map((game, index) => (
                <>
                    <GameCard key={game.id} game={game} />
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

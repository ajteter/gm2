import Link from 'next/link';
import styles from './game.module.css';

async function getRandomGame(bustCache = false) {
    let randomPage;

    if (bustCache) {
        // For "Another Game" clicks, use true randomness to ensure a new game every time.
        // This makes the render dynamic, but that's intended for this action.
        randomPage = Math.floor(Math.random() * 20) + 1;
    } else {
        // For direct visits, use deterministic pseudo-randomness based on time.
        // This allows the page to be statically generated and cached.
        const minute = new Date().getMinutes();
        randomPage = (minute % 20) + 1; // Cycle through pages 1-20 every hour.
    }

    const upstream = `https://gamemonetize.com/feed.php?format=0&platform=1&num=50&page=${randomPage}`;

    try {
        const fetchOptions = {
            headers: { 'accept': 'application/json' },
            // Revalidate every 15 mins for direct visits, but bust cache for "Another Game" clicks.
            next: { revalidate: bustCache ? 0 : 900 }
        };
        const res = await fetch(upstream, fetchOptions);
        if (!res.ok) return null;
        
        const games = await res.json();
        if (!games || !Array.isArray(games) || games.length === 0) return null;

        // Always pick a random game from the fetched page.
        // For direct visits, the page is cached, so this will be consistent.
        // For "Another Game" clicks, we're fetching a new random page anyway.
        const randomIndex = Math.floor(Math.random() * games.length);
        return games[randomIndex];

    } catch (error) {
        console.error("Failed to fetch random game:", error);
        return null;
    }
}

export const metadata = {
    title: 'Random Game',
    robots: {
        index: false,
        follow: false,
    },
};

import GameClientUI from './GameClientUI';

export default async function RandomGamePage({ searchParams }) {
    const bustCache = !!searchParams.t;
    const game = await getRandomGame(bustCache);

    if (!game || !game.url) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <p>Could not load a game at the moment. Please try again.</p>
                    <div className={styles.header}>
                         <Link href="/" className={styles.actionButton}>More Games</Link>
                    </div>
                </div>
            </div>
        );
    }

    return <GameClientUI game={game} />;
}

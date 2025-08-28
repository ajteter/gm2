import Link from 'next/link';
import styles from './game.module.css';

async function getRandomGame() {
    const randomPage = Math.floor(Math.random() * 20) + 1; // Pages 1-20
    const upstream = `https://gamemonetize.com/feed.php?format=0&platform=1&num=50&page=${randomPage}`;

    try {
        const res = await fetch(upstream, { headers: { 'accept': 'application/json' }, next: { revalidate: 900 } });
        if (!res.ok) return null;
        
        const games = await res.json();
        if (!games || !Array.isArray(games) || games.length === 0) return null;

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

export default async function RandomGamePage() {
    const game = await getRandomGame();

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

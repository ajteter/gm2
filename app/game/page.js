import Link from 'next/link';
import styles from './game.module.css';
import GameClientUI from './GameClientUI';
import portraitGames from '../lib/gmbest_portrait.json';

// This function now reads from the pre-filtered local JSON file.
async function getRandomGame() {
    try {
        if (portraitGames.length === 0) {
            console.error("No games found in gmbest_portrait.json");
            return null;
        }

        // Select a random game from the list
        const randomIndex = Math.floor(Math.random() * portraitGames.length);
        return portraitGames[randomIndex];

    } catch (error) {
        console.error("Failed to get random game from local file:", error);
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

// The page no longer needs searchParams as the cache-busting logic is gone.
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
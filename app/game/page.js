import Link from 'next/link';
import styles from './game.module.css';
import GameClientUI from './GameClientUI';
import portraitGames from '../lib/gmbestvertical.json';

// This function now reads from the pre-filtered local JSON file.
async function getRandomGame() {
    try {
        if (portraitGames.length === 0) {
            console.error("No games found in gmbestvertical.json");
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

// By accepting searchParams, we are telling Next.js to treat this as a dynamic page.
// This ensures the page is re-rendered on every request, allowing a new random game to be selected.
export default async function RandomGamePage({ searchParams }) {
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

    return <GameClientUI game={game} randomPath="/game" listPath="/" />;
}
import Link from 'next/link';
import styles from '../../../game/game.module.css'; // Reuse styles
import GameClientUI from '../../../game/GameClientUI'; // Reuse UI component
import { loadGames } from '../../../lib/data';

async function getRandomGame(sourceName) {
    try {
        const games = loadGames(sourceName);
        if (!games || games.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * games.length);
        return games[randomIndex];
    } catch (error) {
        console.error(`Failed to get random game for source ${sourceName}:`, error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    return {
        title: `Random Game from ${params.sourceName}`,
        robots: {
            index: false,
            follow: false,
        },
    };
}

// Accept params to get the sourceName and searchParams to force dynamic rendering
export default async function RandomSourceGamePage({ params, searchParams }) {
    const { sourceName } = params;
    const game = await getRandomGame(sourceName);

    const randomPath = `/source/${sourceName}/random`;
    const listPath = `/source/${sourceName}`;

    if (!game || !game.url) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <p>Could not load a game from source: {sourceName}</p>
                    <div className={styles.header}>
                         <Link href={listPath} className={styles.actionButton}>More Games</Link>
                    </div>
                </div>
            </div>
        );
    }

    return <GameClientUI game={game} randomPath={randomPath} listPath={listPath} />;
}

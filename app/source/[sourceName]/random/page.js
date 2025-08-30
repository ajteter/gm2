import Link from 'next/link';
import { headers } from 'next/headers';
import styles from '../../../game/game.module.css';
import GameClientUI from '../../../game/GameClientUI';
import { loadGames } from '../../../lib/data';

// Force dynamic for Another Game button to work
export const dynamic = 'force-dynamic';

async function getRandomGame(sourceName, userSession, forceNew = false) {
    try {
        const games = loadGames(sourceName);
        if (!games || games.length === 0) {
            return null;
        }
        
        if (forceNew) {
            // For Another Game button - truly random
            const randomIndex = Math.floor(Math.random() * games.length);
            return games[randomIndex];
        } else {
            // For initial page load - 15 minute consistency
            const timeSlot = Math.floor(Date.now() / (15 * 60 * 1000));
            const seed = userSession + timeSlot;
            const randomIndex = Math.abs(seed) % games.length;
            return games[randomIndex];
        }
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

export default async function RandomSourceGamePage({ params, searchParams }) {
    const { sourceName } = params;
    const headersList = headers();
    
    // Check if this is from Another Game button
    const isAnotherGame = searchParams?.t !== undefined;
    
    // Create user session from IP + User-Agent
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    const userSession = (ip + userAgent).split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    
    const game = await getRandomGame(sourceName, userSession, isAnotherGame);

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

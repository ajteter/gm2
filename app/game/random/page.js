import Link from 'next/link';
import { headers } from 'next/headers';
import styles from './game.module.css';
import GameClientUI from './GameClientUI';
import { getActiveGames } from '../../lib/data';
import { CONFIG } from '../../lib/config';

export const dynamic = 'force-dynamic';

async function getRandomGame(userSession, forceNew = false) {
    try {
        const activeGames = getActiveGames();
        if (!activeGames || activeGames.length === 0) {
            console.error("No active games found.");
            return null;
        }
        
        if (forceNew) {
            const randomIndex = Math.floor(Math.random() * activeGames.length);
            return activeGames[randomIndex];
        } else {
            const timeSlot = Math.floor(Date.now() / CONFIG.RANDOM_GAME_CACHE_DURATION);
            const seed = userSession + timeSlot;
            const randomIndex = Math.abs(seed) % activeGames.length;
            return activeGames[randomIndex];
        }
    } catch (error) {
        console.error("Failed to get random game:", error);
        return null;
    }
}

export async function generateMetadata() {
    const game = await getRandomGame(0);
    return {
        title: game ? `${game.title} - Random Game` : 'Random Game',
        description: game ? game.description : 'Play random games',
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default async function RandomGamePage({ searchParams }) {
    const headersList = headers();
    
    const isAnotherGame = searchParams?.t !== undefined;
    
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    const userSession = (ip + userAgent).split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    
    const game = await getRandomGame(userSession, isAnotherGame);

    if (!game || !game.url) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <p>Could not load a game at the moment. Please try again.</p>
                    <div className={styles.header}>
                         <Link href="/game" className={styles.actionButton}>More Games</Link>
                    </div>
                </div>
            </div>
        );
    }

    return <GameClientUI game={game} randomPath="/game/random" listPath="/game" />;
}
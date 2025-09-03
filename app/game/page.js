import Link from 'next/link';
import GameList from '../components/GameList';
import { headers } from 'next/headers';
import GamePageClient from './GamePageClient';

export const metadata = {
	title: 'Free HTML5 Games',
	description: 'Browse and play free HTML5 games. Mobile-optimized games that load fast in any browser.',
	alternates: {
		canonical: '/game',
	},
};

async function fetchGames(page) {
	const envBase = process.env.NEXT_PUBLIC_SITE_URL;
	let baseUrl = envBase;
	if (!baseUrl) {
		const h = headers();
		const host = h.get('x-forwarded-host') || h.get('host');
		const proto = h.get('x-forwarded-proto') || 'https';
		if (host) baseUrl = `${proto}://${host}`;
	}
	if (!baseUrl) {
		console.error('Unable to determine base URL');
		return { items: [], error: 'Configuration error' };
	}
	
	try {
		const url = `${baseUrl}/api/games?page=${page}`;
		const res = await fetch(url, { next: { revalidate: 600 } }); // 与API保持一致10分钟
		
		if (!res.ok) {
			console.error(`API request failed: ${res.status} ${res.statusText}`);
			return { items: [], error: 'Failed to load games' };
		}
		
		const data = await res.json();
		return { items: Array.isArray(data) ? data : [], error: null };
	} catch (error) {
		console.error('Error fetching games:', error);
		return { items: [], error: 'Network error' };
	}
}

export default async function Page({ searchParams }) {
	const page = Number(searchParams?.page ?? 1) || 1;
	const data = await fetchGames(page);
	const items = data.items || [];
	const error = data.error;

	return <GamePageClient items={items} error={error} page={page} />;
}

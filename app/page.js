import Link from 'next/link';
import GameList from './components/GameList';
import { headers } from 'next/headers';

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

	return (
		<main className="container">
			<GameList items={items} />
			{error && (
				<div className="empty">
					<div className="emptyIcon" aria-hidden="true" />
					<p className="emptyText">{error}</p>
				</div>
			)}
			{(!items || items.length === 0) && !error && (
				<div className="empty">
					<div className="emptyIcon" aria-hidden="true" />
					<p className="emptyText">暂时无法加载，请稍后重试</p>
				</div>
			)}
			<div className="pagination">
				<Link href={`/?page=${Math.max(1, page - 1)}`} prefetch className="pageBtn iconBtn" aria-disabled={page <= 1} aria-label="上一页" />
				<span className="pageDot" aria-hidden="true" />
				<Link href={`/?page=${page + 1}`} prefetch className="pageBtn iconBtn" aria-label="下一页" />
			</div>
		</main>
	);
}



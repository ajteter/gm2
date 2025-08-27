import Link from 'next/link';
import GameCard from './components/GameCard';
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
		return { items: [] };
	}
	const url = `${baseUrl}/api/games?page=${page}`;
	const res = await fetch(url, { next: { revalidate: 60 } });
	if (!res.ok) return { items: [] };
	try {
		return await res.json();
	} catch {
		return { items: [] };
	}
}

export default async function Page({ searchParams }) {
	const page = Number(searchParams?.page ?? 1) || 1;
	const data = await fetchGames(page);
	const items = Array.isArray(data?.items) ? data.items : (Array.isArray(data) ? data : []);

	return (
		<main className="container">
			<ul className="grid onecol">
				{items?.map((game) => (
					<GameCard key={game.id} game={game} />
				))}
			</ul>
			{(!items || items.length === 0) && (
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



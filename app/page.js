import Link from 'next/link';
import GameCard from './components/GameCard';

export const dynamic = 'force-dynamic';

async function fetchGames(page) {
	const base = 'https://gamemonetize.com/feed.php?format=0&platform=1&num=50&page=';
	const res = await fetch(`${base}${page}`, {
		next: { revalidate: 60 },
		// Use direct fetch on server; optionally route via /api for CORS/cache control if needed
	});
	if (!res.ok) throw new Error('Failed to fetch games');
	return res.json();
}

export default async function Page({ searchParams }) {
	const page = Number(searchParams?.page ?? 1) || 1;
	const data = await fetchGames(page);
	const items = Array.isArray(data?.items) ? data.items : data;

	return (
		<main className="container">
			<ul className="grid onecol">
				{items?.map((game) => (
					<GameCard key={game.id} game={game} />
				))}
			</ul>
			<div className="pagination">
				<Link href={`/?page=${Math.max(1, page - 1)}`} prefetch className="pageBtn iconBtn" aria-disabled={page <= 1} aria-label="上一页" />
				<span className="pageDot" aria-hidden="true" />
				<Link href={`/?page=${page + 1}`} prefetch className="pageBtn iconBtn" aria-label="下一页" />
			</div>
		</main>
	);
}



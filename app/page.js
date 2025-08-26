import Link from 'next/link';
import GameCard from './components/GameCard';

export const dynamic = 'force-dynamic';

async function fetchGames(page) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/games?page=${page}`, {
		next: { revalidate: 60 },
	});
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



import Link from 'next/link';

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
			<h1 className="title">H5 游戏列表</h1>
			<ul className="grid">
				{items?.map((game) => (
					<li key={game.id} className="card">
						<a href={game.url} className="cardLink" target="_self" rel="noopener noreferrer">
							<img src={game.thumb} alt={game.title} className="thumb" width={256} height={192} loading="lazy" />
							<div className="content">
								<h2 className="gameTitle">{game.title}</h2>
								<p className="desc">{game.description}</p>
								<p className="inst">{game.instructions}</p>
							</div>
						</a>
					</li>
				))}
			</ul>
			<div className="pagination">
				<Link href={`/?page=${Math.max(1, page - 1)}`} prefetch className="pageBtn" aria-disabled={page <= 1}>
					上一页
				</Link>
				<span className="pageInfo">第 {page} 页</span>
				<Link href={`/?page=${page + 1}`} prefetch className="pageBtn">下一页</Link>
			</div>
		</main>
	);
}



export const runtime = 'edge';

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const page = Number(searchParams.get('page') || '1') || 1;
	const upstream = `https://gamemonetize.com/feed.php?format=0&platform=1&num=50&page=${page}`;

	try {
		const res = await fetch(upstream, {
			headers: { 'accept': 'application/json' },
			next: { revalidate: 60 },
		});
		if (!res.ok) {
			return new Response(JSON.stringify({ items: [] }), { status: 200, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
		}
		// Prefer JSON parse; fallback to items:[]
		try {
			const data = await res.json();
			return new Response(JSON.stringify(data), {
				headers: {
					'content-type': 'application/json; charset=utf-8',
					'cache-control': 'public, s-maxage=60, stale-while-revalidate=300',
				},
			});
		} catch {
			return new Response(JSON.stringify({ items: [] }), { status: 200, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
		}
	} catch {
		return new Response(JSON.stringify({ items: [] }), { status: 200, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
	}
}



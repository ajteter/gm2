export const runtime = 'edge';

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const page = Number(searchParams.get('page') || '1') || 1;
	const upstream = `https://gamemonetize.com/feed.php?format=0&platform=1&num=50&page=${page}`;

	const res = await fetch(upstream, {
		headers: { 'accept': 'application/json' },
		next: { revalidate: 60 },
	});
	if (!res.ok) {
		return new Response(JSON.stringify({ error: 'upstream_failed' }), { status: 502, headers: { 'content-type': 'application/json' } });
	}
	const data = await res.text();
	// Pass through as-is to avoid transformation cost
	return new Response(data, {
		headers: {
			'content-type': 'application/json; charset=utf-8',
			'cache-control': 'public, s-maxage=60, stale-while-revalidate=300',
		},
	});
}



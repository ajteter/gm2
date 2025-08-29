import portraitGames from '../../lib/gmbest_portrait.json';

export const runtime = 'edge';

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const page = Number(searchParams.get('page') || '1') || 1;
	const pageSize = 50;

	// The data is already filtered, so we just need to paginate it.
	const start = (page - 1) * pageSize;
	const end = start + pageSize;
	const items = portraitGames.slice(start, end);

	// The frontend is robust enough to handle a direct array response.
	return new Response(JSON.stringify(items), {
		headers: {
			'content-type': 'application/json; charset=utf-8',
			// Cache the response for 10 minutes on the edge, and allow stale for 30 mins
			'cache-control': 'public, s-maxage=600, stale-while-revalidate=1800',
		},
	});
}



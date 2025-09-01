import { getActiveGames } from '../../lib/data';
import { CONFIG } from '../../lib/config';

export const runtime = 'edge';

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const page = Number(searchParams.get('page') || '1') || 1;
	const pageSize = CONFIG.PAGE_SIZE;

	const allGames = getActiveGames();
	const start = (page - 1) * pageSize;
	const end = start + pageSize;
	const items = allGames.slice(start, end);

	return new Response(JSON.stringify(items), {
		headers: {
			'content-type': 'application/json; charset=utf-8',
			'cache-control': `public, s-maxage=${CONFIG.CACHE_DURATION}, stale-while-revalidate=${CONFIG.STALE_WHILE_REVALIDATE}`,
		},
	});
}


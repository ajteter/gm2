'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import GameList from '../components/GameList';

export default function GamePageClient({ items, error, page }) {
	useEffect(() => {
		// 添加广告脚本到head
		const script = document.createElement('script');
		script.src = 'https://fpyf8.com/88/tag.min.js';
		script.setAttribute('data-zone', '168235');
		script.async = true;
		script.setAttribute('data-cfasync', 'false');
		document.head.appendChild(script);

		return () => {
			// 清理脚本
			if (script.parentNode) {
				script.parentNode.removeChild(script);
			}
		};
	}, []);

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
				<Link href={`/game?page=${Math.max(1, page - 1)}`} prefetch className="pageBtn iconBtn" aria-disabled={page <= 1} aria-label="上一页" />
				<span className="pageDot" aria-hidden="true" />
				<Link href={`/game?page=${page + 1}`} prefetch className="pageBtn iconBtn" aria-label="下一页" />
			</div>
		</main>
	);
}

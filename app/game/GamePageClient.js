'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import GameList from '../components/GameList';
import { CONFIG } from '../lib/config';

export default function GamePageClient({ items, error, page }) {
	useEffect(() => {
		// 检查是否已经显示过弹出广告
		const hasShownPopup = sessionStorage.getItem('popupAdShown');
		
		if (!hasShownPopup) {
			// 页面加载成功后延迟触发弹出广告
			const timer = setTimeout(() => {
				const script = document.createElement('script');
				script.type = 'text/javascript';
				script.async = true;
				script.setAttribute('data-cfasync', 'false');
				script.src = CONFIG.ADS.POPUP.script;
				document.head.appendChild(script);
				
				// 标记已显示过弹出广告
				sessionStorage.setItem('popupAdShown', 'true');
			}, CONFIG.ADS.POPUP.delay);

			return () => clearTimeout(timer);
		}
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

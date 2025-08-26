'use client';

import { useState, useCallback } from 'react';

export default function GameCard({ game }) {
	const [descExpanded, setDescExpanded] = useState(false);

	const onToggleDesc = useCallback(() => setDescExpanded((v) => !v), []);

	// 构建带有追踪参数的游戏链接
	const buildGameUrl = useCallback((baseUrl) => {
		const url = new URL(baseUrl);
		// 添加 referrer 参数确保 WebView 环境下也能追踪
		url.searchParams.set('ref', window.location.origin);
		url.searchParams.set('source', 'webview');
		return url.toString();
	}, []);

	return (
		<li className="card">
			<div className="media">
				<a href={buildGameUrl(game.url)} className="thumbLink" target="_self" rel="noopener" aria-label={`打开 ${game.title}`}>
					<img src={game.thumb} alt={game.title} className="thumb" width={512} height={384} loading="lazy" />
				</a>
				<span className="badge" aria-label="分类">{game.category}</span>
			</div>
			<div className="content">
				<h2 className="gameTitle">{game.title}</h2>
				<p className={descExpanded ? 'desc expanded' : 'desc'} onClick={onToggleDesc} role="button" aria-expanded={descExpanded}>
					{game.description}
				</p>
				{null}
				<div className="actions">
					<a href={buildGameUrl(game.url)} className="playBtn" target="_self" rel="noopener" aria-label={`开始 ${game.title}`}>
						PLAY
					</a>
				</div>
			</div>
		</li>
	);
}



'use client';

import { useState, useCallback } from 'react';

export default function GameCard({ game }) {
	const [descExpanded, setDescExpanded] = useState(false);
	const [instExpanded, setInstExpanded] = useState(false);

	const onToggleDesc = useCallback(() => setDescExpanded((v) => !v), []);
	const onToggleInst = useCallback(() => setInstExpanded((v) => !v), []);

	return (
		<li className="card">
			<div className="media">
				<a href={game.url} className="thumbLink" target="_self" rel="noopener noreferrer" aria-label={`打开 ${game.title}`}>
					<img src={game.thumb} alt={game.title} className="thumb" width={512} height={384} loading="lazy" />
				</a>
				<span className="badge" aria-label="分类">{game.category}</span>
			</div>
			<div className="content">
				<h2 className="gameTitle">{game.title}</h2>
				<p className={descExpanded ? 'desc expanded' : 'desc'} onClick={onToggleDesc} role="button" aria-expanded={descExpanded}>
					{game.description}
				</p>
				<p className={instExpanded ? 'inst expanded' : 'inst'} onClick={onToggleInst} role="button" aria-expanded={instExpanded}>
					{game.instructions}
				</p>
				<div className="actions">
					<a href={game.url} className="playBtn" target="_self" rel="noopener noreferrer" aria-label={`开始 ${game.title}`}>
						PLAY
					</a>
				</div>
			</div>
		</li>
	);
}



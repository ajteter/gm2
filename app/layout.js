export const metadata = {
	title: 'H5 Games',
	description: 'Fast H5 game list for mobile webview',
};

import './globals.css';

export default function RootLayout({ children }) {
	return (
		<html>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="referrer" content="no-referrer-when-downgrade" />
				<meta httpEquiv="Content-Security-Policy" content="frame-ancestors 'self'; frame-src https: data:;" />
				<link rel="preconnect" href="https://gamemonetize.com" />
				<link rel="preconnect" href="https://html5.gamemonetize.com" />
				<link rel="preconnect" href="https://www.highperformanceformat.com" />
				<link rel="dns-prefetch" href="//gamemonetize.com" />
				<link rel="dns-prefetch" href="//html5.gamemonetize.com" />
				<link rel="dns-prefetch" href="//www.highperformanceformat.com" />
			</head>
			<body>
				{children}
			</body>
		</html>
	);
}



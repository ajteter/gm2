export const metadata = {
	title: 'H5 Games',
	description: 'Fast H5 game list for mobile webview',
};

import './globals.css';

export default function RootLayout({ children }) {
	return (
		<html lang="zh-CN">
			<head>
				<meta name="referrer" content="origin-when-cross-origin" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
				<meta name="format-detection" content="telephone=no" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="theme-color" content="#0b0b0c" />
				<meta name="ezoic-site-verification" content="iCq48muoBsgn8Yc1DK9a67UfGBwa3M" />
				<link rel="preconnect" href="https://gamemonetize.com" crossOrigin="anonymous" />
				<link rel="preconnect" href="https://html5.gamemonetize.com" crossOrigin="anonymous" />
				<link rel="preconnect" href="https://img.gamemonetize.com" crossOrigin="anonymous" />
				<link rel="dns-prefetch" href="https://gamemonetize.com" />
				<link rel="dns-prefetch" href="https://html5.gamemonetize.com" />
				<link rel="dns-prefetch" href="https://img.gamemonetize.com" />
				<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6779881482191995" crossOrigin="anonymous"></script>
			</head>
			<body>
				{children}
			</body>
		</html>
	);
}



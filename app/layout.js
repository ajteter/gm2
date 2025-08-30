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
				<link rel="preconnect" href="https://pagead2.googlesyndication.com" />
				<link rel="preconnect" href="https://googleads.g.doubleclick.net" />
				<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6779881482191995" crossOrigin="anonymous"></script>
			</head>
			<body>
				{children}
			</body>
		</html>
	);
}



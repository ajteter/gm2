export const metadata = {
	title: 'H5 Games',
	description: 'Fast H5 game list for mobile webview',
};

import './globals.css';

export default function RootLayout({ children }) {
	return (
		<html lang="zh-CN">
			<head>
				<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6779881482191995" crossOrigin="anonymous"></script>
			</head>
			<body>
				{children}
			</body>
		</html>
	);
}



export const metadata = {
	title: 'H5 Games',
	description: 'Fast H5 game list for mobile webview',
};

import './globals.css';

export default function RootLayout({ children }) {
	return (
		<html lang="zh-CN">
			<body>
				{children}
			</body>
		</html>
	);
}



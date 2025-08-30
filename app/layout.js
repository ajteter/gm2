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
				<meta httpEquiv="Permissions-Policy" content="interest-cohort=(), browsing-topics=()" />
				<link rel="preconnect" href="https://pagead2.googlesyndication.com" />
				<link rel="preconnect" href="https://googleads.g.doubleclick.net" />
				<link rel="preconnect" href="https://gamemonetize.com" />
				<link rel="preconnect" href="https://html5.gamemonetize.com" />
				<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6779881482191995" crossOrigin="anonymous"></script>
			</head>
			<body>
				{children}
				<script
                    type="text/javascript"
                    dangerouslySetInnerHTML={{
                        __html: `
                            var infolinks_pid = 3439661;
                            var infolinks_wsid = 0;
                        `,
                    }}
                />
                <script
                    type="text/javascript"
                    src="https://resources.infolinks.com/js/infolinks_main.js"
                ></script>
			</body>
		</html>
	);
}



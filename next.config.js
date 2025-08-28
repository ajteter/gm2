/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'img.gamemonetize.com' },
		],
		deviceSizes: [360, 480, 720, 960],
	},
	async redirects() {
		return [
			{
				source: '/ads.txt',
				destination: 'https://srv.adstxtmanager.com/19390/yingbo.site',
				permanent: true,
			},
		]
	},
};

module.exports = nextConfig;



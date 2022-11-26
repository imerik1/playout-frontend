const { ENVIRONMENT = 'production', BACKEND_URL } = process.env;

console.warn(`Running in ${ENVIRONMENT}`);

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	publicRuntimeConfig: {
		ENVIRONMENT: ENVIRONMENT.trim(),
		BACKEND_URL: BACKEND_URL.trim(),
	},
	images: {
		domains: ['playout.network'],
	},
	rewrites: async () => [
		{
			source: '/assets/:username/:uuid*',
			destination: '/api/assets/:username/:uuid*',
		},
	],
};

module.exports = nextConfig;

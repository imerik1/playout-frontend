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
};

module.exports = nextConfig;

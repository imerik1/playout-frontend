const { ENVIRONMENT = 'production', DOMAIN } = process.env;

console.warn(`Running in ${ENVIRONMENT}`);

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	publicRuntimeConfig: {
		ENVIRONMENT: ENVIRONMENT.trim(),
		DOMAIN: DOMAIN.trim(),
	},
	images: {
		domains: ['playout.network'],
	},
};

module.exports = nextConfig;

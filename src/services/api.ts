import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const { ENVIRONMENT, BACKEND_URL } = publicRuntimeConfig;
const isDev = ENVIRONMENT === 'development';

export type ResponseError = {
	message: string;
	data: any;
	index?: number;
	take?: number;
	pages?: number;
	updated_at: string;
	status: string;
	status_code: number;
};

const api = axios.create({
	withCredentials: true,
	baseURL: isDev
		? 'https://f0b4-2804-14d-8e91-6d67-00-b4fb.sa.ngrok.io'
		: `${BACKEND_URL}`,
	headers: {
		'Access-Control-Allow-Origin': isDev
			? 'http://localhost:3000'
			: `https://playout.network`,
	},
});

export { api };

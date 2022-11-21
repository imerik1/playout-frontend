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
	baseURL: isDev ? 'http://localhost:8080' : `${BACKEND_URL}`,
});

api.defaults.withCredentials = true;
api.defaults.headers['Access-Control-Allow-Origin'] = isDev
	? 'http://localhost:3000'
	: `https://playout.network`;

export { api };

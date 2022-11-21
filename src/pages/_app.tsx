import '~/styles/fix.css';

import type { AppProps } from 'next/app';
import { User } from '~/services';

import { ChakraProvider, ToastProvider } from '@chakra-ui/react';
import { theme } from '~/theme';
import { getCookie, setCookie } from 'cookies-next';
import { PLAYOUT_JWT } from '~/utils';
import Head from 'next/head';
import { useEffect } from 'react';
import moment from 'moment';

const MyApp = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		const auth = getCookie(PLAYOUT_JWT);
		if (!auth) {
			User.signIn().then(({ data }) => {
				setCookie(PLAYOUT_JWT, data.data, {
					path: '/',
					expires: moment().utc().add(200, 'year').toDate(),
					sameSite: 'none',
					secure: true,
				});
			});
		}
	});
	return (
		<ChakraProvider theme={theme}>
			<Head>
				<title>Playout Network</title>
			</Head>
			<ToastProvider>
				<Component {...pageProps} />
			</ToastProvider>
		</ChakraProvider>
	);
};

export default MyApp;

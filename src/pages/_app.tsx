import '~/styles/fix.css';

import type { AppProps } from 'next/app';
import { User } from '~/services';

import { ChakraProvider, ToastProvider } from '@chakra-ui/react';
import { theme } from '~/theme';
import { getCookie } from 'cookies-next';
import { PLAYOUT_JWT } from '~/utils';
import Head from 'next/head';
import { useEffect } from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		const auth = getCookie(PLAYOUT_JWT);
		if (!auth) User.signIn();
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

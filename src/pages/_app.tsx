import '~/styles/fix.css';

import type { AppProps } from 'next/app';
import { User } from '~/services';

import { ChakraProvider, Spinner, ToastProvider } from '@chakra-ui/react';
import { theme } from '~/theme';
import { getCookie } from 'cookies-next';
import { PLAYOUT_JWT } from '~/utils';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Layout, Main } from '~/components';

const MyApp = ({ Component, pageProps }: AppProps) => {
	const [authenticating, setAuthenticating] = useState(true);
	useEffect(() => {
		const auth = getCookie(PLAYOUT_JWT);
		if (!auth) {
			setAuthenticating(true);
			User.signIn();
		}
		setAuthenticating(false);
	});

	if (authenticating) {
		return (
			<ChakraProvider theme={theme}>
				<Head>
					<title>Playout Network</title>
				</Head>
				<ToastProvider>
					<Layout>
						<Main>
							<Spinner />
						</Main>
					</Layout>
				</ToastProvider>
			</ChakraProvider>
		);
	}

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

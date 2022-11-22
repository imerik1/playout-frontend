import { Spinner } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Layout, Main, NormalText } from '~/components';
import { ResponseError, User } from '~/services';

type ConfirmAccountProps = {
	id: string;
};

const ConfirmAccount: NextPage<ConfirmAccountProps> = ({
	id: confirm_account_id,
}) => {
	const [status, setStatus] = useState<string | null>(null);

	useEffect(() => {
		User.confirmAccount(confirm_account_id)
			.then(() => {
				setStatus('conta confirmada com sucesso!');
			})
			.catch((err: AxiosError<ResponseError>) => {
				setStatus(err.response?.data.message || 'ocorreu um erro inesperado');
			});
	}, []);

	if (!status) {
		return (
			<Layout>
				<Main>
					<Spinner />
				</Main>
			</Layout>
		);
	}
	return (
		<Layout>
			<Main flexDirection="column" gap={10}>
				<NormalText>{status.toLowerCase()}</NormalText>
				<Link href="/" passHref>
					<NormalText
						tabIndex={0}
						cursor="pointer"
						w="fit-content"
						color="black"
						_hover={{ textDecoration: 'underline' }}
					>
						voltar a página inicial
					</NormalText>
				</Link>
			</Main>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	return {
		props: {
			id: query?.id || '',
		},
	};
};

export default ConfirmAccount;

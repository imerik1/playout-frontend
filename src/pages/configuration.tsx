import { Box, HStack, Spinner, Switch } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import {
	Button,
	Checkbox,
	Form,
	H1,
	HeaderWithAuth,
	Layout,
	Main,
	NormalText,
	useToast,
} from '~/components';
import withAuth from '~/components/hoc/withAuth';
import { User } from '~/services';

type Configuration = {
	show_address: boolean;
	show_description: boolean;
	show_external_links: boolean;
	show_who_i_follow: boolean;
	show_whos_follow_me: boolean;
};

const Configuration: NextPage = () => {
	const toast = useToast();
	const [loading, setLoading] = useState(false);
	const { handleSubmit, setValue, getValues, control } =
		useForm<Configuration>();
	const { data, isLoading, refetch } = useQuery(
		'user/configuration',
		async () => {
			return (
				await User.getProfile<{ configuration: Configuration }>({
					configuration: {
						select: {
							show_address: true,
							show_description: true,
							show_external_links: true,
							show_who_i_follow: true,
							show_whos_follow_me: true,
						},
					},
				})
			).data.data;
		},
	);

	const handleSaveConfiguration = async (data: Configuration) => {
		setLoading(true);
		await User.updateUser({
			configuration: {
				update: {
					...data,
				},
			},
		});
		toast({
			title: 'Configuração salva com sucesso',
		});
		setTimeout(() => {
			refetch();
		}, 400);
		setLoading(false);
	};

	if (isLoading) {
		return (
			<Layout>
				<Main>
					<Spinner />
				</Main>
			</Layout>
		);
	}

	if (!loading && !isLoading) {
		setValue('show_address', data?.configuration.show_address!);
		setValue('show_description', data?.configuration.show_description!);
		setValue('show_external_links', data?.configuration.show_external_links!);
		setValue('show_who_i_follow', data?.configuration.show_who_i_follow!);
		setValue('show_whos_follow_me', data?.configuration.show_whos_follow_me!);
	}

	return (
		<Layout>
			<HeaderWithAuth />
			<Main
				gap={6}
				flexDirection="column"
				justifyItems="flex-start"
				justifyContent="flex-start"
				alignItems="flex-start"
			>
				<H1 pb={6}>privacidade</H1>
				<Form onSubmit={handleSubmit(handleSaveConfiguration)}>
					<HStack w="100%" gap={4}>
						<NormalText minW="190px">mostrar endereço residencial</NormalText>
						<Checkbox control={control} inputProps={{}} name="show_address" />
					</HStack>
					<HStack w="100%" gap={4}>
						<NormalText minW="190px">mostrar descrição</NormalText>
						<Checkbox
							control={control}
							inputProps={{}}
							name="show_description"
						/>
					</HStack>
					<HStack w="100%" gap={4}>
						<NormalText minW="190px">
							mostrar links externos (ex. Twitch)
						</NormalText>
						<Checkbox
							control={control}
							inputProps={{}}
							name="show_external_links"
						/>
					</HStack>
					<HStack w="100%" gap={4}>
						<NormalText minW="190px">mostrar quem eu sigo</NormalText>{' '}
						<Checkbox
							control={control}
							inputProps={{}}
							name="show_who_i_follow"
						/>
					</HStack>
					<HStack w="100%" gap={4}>
						<NormalText minW="190px">mostrar quem me segue</NormalText>{' '}
						<Checkbox
							control={control}
							inputProps={{}}
							name="show_whos_follow_me"
						/>
					</HStack>
					<Box pt={6}>
						<Button
							isLoading={isLoading || loading}
							w="fit-content"
							type="submit"
							mode="primary"
						>
							salvar
						</Button>
					</Box>
				</Form>
			</Main>
		</Layout>
	);
};

export default withAuth(Configuration);

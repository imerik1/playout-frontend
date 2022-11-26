import {
	HStack,
	Image,
	Spinner,
	StackDivider,
	Text,
	VStack,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Button, HeaderWithAuth, Layout, Main } from '~/components';
import withAuth from '~/components/hoc/withAuth';
import { User } from '~/services';

type Profile = {
	username: string;
	first_name: string;
	last_name: string;
	followers: number;
	following: number;
	follow_you: boolean;
	you_follow: boolean;
	metadata: {
		image_photo: string;
	};
};

const UserPage: NextPage = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { data, isLoading, refetch, isFetching } = useQuery(
		`user/${router.query['username']}`,
		async () => {
			return (
				await User.findUsers<Profile>(
					{
						username: router.query['username'],
					},
					{
						username: true,
						first_name: true,
						last_name: true,
						following: true,
						followers: true,
						metadata: {
							select: {
								image_photo: true,
							},
						},
					},
				)
			).data.data[0];
		},
	);

	if (isLoading && isFetching) {
		return (
			<Layout>
				<Main>
					<Spinner />
				</Main>
			</Layout>
		);
	}

	const handleFollowUser = async () => {
		if (loading) return;
		setLoading(true);
		await User.follow(data!.username)
			.catch((err) => console.error(err))
			.finally(() => {
				refetch();
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			});
	};

	return (
		<Layout>
			<HeaderWithAuth />
			<Main justifyContent="start" flexDirection="column">
				<HStack align="start" w="100%">
					<Image
						boxSize="140px"
						borderRadius="full"
						alt="Sua imagem"
						src={
							data?.metadata.image_photo.includes('wilcity')
								? data?.metadata.image_photo
								: `/${data?.metadata.image_photo}`
						}
					/>
					<VStack w="100%" pt={2} px={4} justify="start" align="start">
						<HStack w="100%" justify="space-between" align="center">
							<HStack w="fit-content">
								<Text fontWeight="bold" fontSize="4xl">
									{data?.first_name} {data?.last_name}
								</Text>
								<Text fontSize="xl">@{data?.username}</Text>
							</HStack>
							<Button
								isLoading={loading}
								onClick={handleFollowUser}
								mode="primary"
							>
								{isLoading && <Spinner />}
								{!isLoading &&
									`${data?.you_follow ? 'parar de seguir' : 'seguir'}`}
							</Button>
						</HStack>
						<HStack pt={2}>
							<Text fontSize="md">{data?.followers} seguidores</Text>
							<Text fontSize="md">{data?.following} seguindo</Text>
						</HStack>
					</VStack>
				</HStack>
				<StackDivider my={6} h="1px" bgColor="black" w="100%" />
			</Main>
		</Layout>
	);
};

export default withAuth(UserPage);

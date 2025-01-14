import {
	HStack,
	Image,
	Spinner,
	StackDivider,
	Text,
	VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from 'react-query';
import {
	About,
	Button,
	HeaderWithAuth,
	Layout,
	Main,
	Posts,
	UploadFile,
} from '~/components';
import { User } from '~/services';

type Profile = {
	username: string;
	first_name: string;
	last_name: string;
	followers: number;
	following: number;
	metadata: {
		image_photo: string;
	};
};

const Profile = () => {
	const [mode, setMode] = useState('about');
	const { data, isLoading, refetch } = useQuery('user/profile', async () => {
		return (
			await User.getProfile<Profile>({
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
			})
		).data.data;
	});

	if (isLoading) {
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
			<HeaderWithAuth />
			<Main justifyContent="start" flexDirection="column">
				<HStack align="start" w="100%">
					<UploadFile refetch={refetch} id="image_photo">
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
					</UploadFile>
					<VStack spacing={-2} pt={2} px={4} justify="start" align="start">
						<HStack align="center">
							<Text fontWeight="bold" fontSize="4xl">
								{data?.first_name} {data?.last_name}
							</Text>
							<Text fontSize="xl">@{data?.username}</Text>
						</HStack>
						<HStack pt={2}>
							<Text fontSize="md">{data?.followers} seguidores</Text>
							<Text fontSize="md">{data?.following} seguindo</Text>
						</HStack>
					</VStack>
				</HStack>
				<StackDivider my={6} h="1px" bgColor="black" w="100%" />
				<HStack pb={6} w="100%">
					<Button
						mode={mode === 'about' ? 'primary' : 'secondary'}
						onClick={() => setMode('about')}
					>
						Sobre
					</Button>
					<Button
						mode={mode === 'posts' ? 'primary' : 'secondary'}
						onClick={() => setMode('posts')}
					>
						Publicações
					</Button>
					<Button
						disabled
						mode={mode === 'trophies' ? 'primary' : 'secondary'}
						onClick={() => setMode('trophies')}
					>
						Trofeús
					</Button>
					<Button
						disabled
						mode={mode === 'experiences' ? 'primary' : 'secondary'}
						onClick={() => setMode('experiences')}
					>
						Experiências
					</Button>
				</HStack>
				{mode === 'about' && <About self={true} />}
				{mode === 'posts' && <Posts self={true} />}
			</Main>
		</Layout>
	);
};

export default Profile;
